/**
 * Created by Infuse on 21/07/17.
 */
import db from '../knex';
const Joi = require('joi');

module.exports = [
    {
        path: '/manastones',
        method: 'GET',
        handler: (request, reply) => {
            var params = request.query;
            params.offset = (params.page - 1) * params.limit;
            var countQuery = db('Manastones')
                .where('NameEn', 'like', '%' + params.name + '%')
                .andWhereNot('NameEn', 'like', '%test%')
                .andWhere('Level', '>=', params.minLevel)
                .andWhere('Level', '<=', params.maxLevel)
                .whereIn('Quality', params.qualities);
            countQuery.count('Id AS cnt').then(count => {
                request.totalCount = count[0].cnt;
            });
            var mainQuery = db('Manastones')
                .where('NameEn', 'like', '%' + params.name + '%')
                .andWhereNot('NameEn', 'like', '%test%')
                .andWhere('Level', '>=', params.minLevel)
                .andWhere('Level', '<=', params.maxLevel)
                .whereIn('Quality', params.qualities);
            mainQuery.orderBy(params.sort, params.dir)
                .limit(params.limit)
                .offset(params.offset).then((results) => {
                reply(results);
            });
        },
        config: {
            description: 'All manastones',
            validate: {
                query: {
                    dir: Joi.string().valid('asc', 'desc').default('asc'),
                    sort: Joi.string().default('NameEn'),

                    limit: Joi.number().integer(),
                    page: Joi.number().integer(),
                    pagination: Joi.boolean(),

                    name: Joi.string().allow('').optional().default(''),
                    minLevel: Joi.number().integer().min(0).max(100).default(1),
                    maxLevel: Joi.number().integer().min(0).max(100).default(100),
                    qualities: Joi.array().single()
                        .items(Joi.string().valid('common', 'rare', 'legend', 'unique', 'epic', 'mythic'))
                        .default(['common', 'rare', 'legend', 'unique', 'epic', 'mythic'])
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/manastones/{id}',
        handler: function (request, reply) {
            const id = request.params.id;
            db('Manastones').where('Id', id)
                .then( (result) => {
                    reply({manastones: result[0]});
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