/**
 * Created by Infuse on 21/07/17.
 */
import db from '../knex';
const Joi = require('joi');

module.exports = [
    {
        path: '/accessories',
        method: 'GET',
        handler: (request, reply) => {
            var params = request.query;
            params.offset = (params.page - 1) * params.limit;
            var countQuery = db('Accessories')
                .where('NameEn', 'like', '%' + params.name + '%')
                .andWhereNot('NameEn', 'like', '%test%')
                .andWhere('Type', 'like', '%' + params.type + '%')
                .andWhere('EquipmentSlots', 'like', '%' + params.equipmentSlots + '%')
                .andWhere('Level', '>=', params.minLevel)
                .andWhere('Level', '<=', params.maxLevel)
                .whereIn('Quality', params.qualities)
                .whereIn('Race', params.races);
            if (params.highDeva == 1) {
                countQuery.andWhere('HighDeva', params.highDeva);
            }
            if (params.isPvP == 1) {
                countQuery.andWhere('IsPvP', params.isPvP);
            }
            if (params.isPvE == 1) {
                countQuery.andWhere('IsPvE', params.isPvE);
            }
            countQuery.count('Id AS cnt').then(count => {
                request.totalCount = count[0].cnt;
            });
            var mainQuery = db('Accessories')
                .where('NameEn', 'like', '%' + params.name + '%')
                .andWhereNot('NameEn', 'like', '%test%')
                .andWhere('Type', 'like', '%' + params.type + '%')
                .andWhere('EquipmentSlots', 'like', '%' + params.equipmentSlots + '%')
                .andWhere('Level', '>=', params.minLevel)
                .andWhere('Level', '<=', params.maxLevel)
                .whereIn('Quality', params.qualities)
                .whereIn('Race', params.races);
            if (params.highDeva == 1) {
                mainQuery.andWhere('HighDeva', params.highDeva);
            }
            if (params.isPvP == 1) {
                mainQuery.andWhere('IsPvP', params.isPvP);
            }
            if (params.isPvE == 1) {
                mainQuery.andWhere('IsPvE', params.isPvE);
            }
            mainQuery.orderBy(params.sort, params.dir)
                .limit(params.limit)
                .offset(params.offset).then((results) => {
                reply(results);
                //reply.paginate({ accessories: results, type: 'accessory' }, request.totalCount, { key: 'accessories' });
            });
        },
        config: {
            description: 'All accessories',
            validate: {
                query: {
                    dir: Joi.string().valid('asc', 'desc').default('asc'),
                    sort: Joi.string().default('NameEn'),

                    limit: Joi.number().integer(),
                    page: Joi.number().integer(),
                    pagination: Joi.boolean(),

                    name: Joi.string().allow('').optional().default(''),
                    type: Joi.string().allow('').optional().valid('normal', 'draconic', 'devanion', 'abyss').default(''),
                    equipmentSlots: Joi.string().allow('').optional()
                        .valid('head', 'neck', 'right_or_left_ea', 'right_or_left_fi', 'waist').default(''),

                    minLevel: Joi.number().integer().min(0).max(100).default(1),
                    maxLevel: Joi.number().integer().min(0).max(100).default(100),
                    qualities: Joi.array().single()
                        .items(Joi.string().valid('common', 'rare', 'legend', 'unique', 'epic', 'mythic'))
                        .default(['common', 'rare', 'legend', 'unique', 'epic', 'mythic']),
                    races: Joi.array().single()
                        .items(Joi.number().integer().min(0).max(2))
                        .default([0, 1, 2]), // 0 = asmo, 1=ely, 2=other

                    highDeva: Joi.number().integer().min(0).max(1).default(0),
                    isPvP: Joi.number().integer().min(0).max(1).default(0),
                    isPvE: Joi.number().integer().min(0).max(1).default(0)
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/accessories/{id}',
        handler: function (request, reply) {
            const id = request.params.id;
            db('Accessories').where('Id', id)
                .then( (result) => {
                    reply({accessories: result[0]});
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