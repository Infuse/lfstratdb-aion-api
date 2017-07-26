/**
 * Created by Infuse on 21/07/17.
 */
import db from '../knex';
const Joi = require('joi');

module.exports = [
    {
        path: '/bracelets',
        method: 'GET',
        handler: (request, reply) => {
            var params = request.query;
            params.offset = (params.page - 1) * params.limit;
            var countQuery = db('Bracelets')
                .where('NameEn', 'like', '%' + params.name + '%')
                .andWhereNot('NameEn', 'like', '%test%');
            countQuery.count('Id AS cnt').then(count => {
                request.totalCount = count[0].cnt;
            });
            var mainQuery = db('Bracelets')
                .where('NameEn', 'like', '%' + params.name + '%')
                .andWhereNot('NameEn', 'like', '%test%');
            mainQuery.orderBy(params.sort, params.dir)
                .limit(params.limit)
                .offset(params.offset).then((results) => {
                reply(results);
            });
        },
        config: {
            description: 'All bracelets',
            validate: {
                query: {
                    dir: Joi.string().valid('asc', 'desc').default('asc'),
                    sort: Joi.string().default('NameEn'),

                    limit: Joi.number().integer(),
                    page: Joi.number().integer(),
                    pagination: Joi.boolean(),

                    name: Joi.string().allow('').optional().default('')
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/bracelets/{id}',
        handler: function (request, reply) {
            const id = request.params.id;
            db('Bracelets').where('Id', id)
                .then( (result) => {
                    reply({bracelets: result[0]});
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