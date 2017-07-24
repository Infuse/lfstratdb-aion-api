/**
 * Created by Infuse on 21/07/17.
 */
import db from '../knex';
const Joi = require('joi');

module.exports = [
    {
        path: '/feathers',
        method: 'GET',
        handler: (request, reply) => {
            var params = request.query;
            params.offset = (params.page - 1) * params.limit;
            var countQuery = db('Feathers')
                .where('NameEn', 'like', '%' + params.name + '%')
                .andWhereNot('NameEn', 'like', '%test%')
                .whereIn('Race', params.races);
            countQuery.count('Id AS cnt').then(count => {
                request.totalCount = count[0].cnt;
            });
            var mainQuery = db('Feathers')
                .where('NameEn', 'like', '%' + params.name + '%')
                .andWhereNot('NameEn', 'like', '%test%')
                .whereIn('Race', params.races);
            mainQuery.orderBy(params.sort, params.dir)
                .limit(params.limit)
                .offset(params.offset).then((results) => {
                reply(results);
            });
        },
        config: {
            description: 'All feathers',
            validate: {
                query: {
                    dir: Joi.string().valid('asc', 'desc').default('asc'),
                    sort: Joi.string().default('NameEn'),

                    limit: Joi.number().integer(),
                    page: Joi.number().integer(),
                    pagination: Joi.boolean(),

                    name: Joi.string().allow('').optional().default(''),
                    races: Joi.array().single()
                        .items(Joi.number().integer().min(0).max(2))
                        .default([0, 1, 2]) // 0 = asmo, 1=ely, 2=other
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/feathers/{id}',
        handler: function (request, reply) {
            const id = request.params.id;
            db('Feathers').where('Id', id)
                .then( (result) => {
                    reply(result);
                });
        },
        config: {
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }
];