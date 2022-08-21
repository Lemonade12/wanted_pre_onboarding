const sequelize = require('sequelize');
const db = require('../../../database/models/index');
const Apply = db.apply_log;
const Op = sequelize.Op;

async function readApplyLog(opening_id, user_id){
    const data = await Apply.findOne({
        where: {
            opening_id: opening_id,
            user_id: user_id,
        }
    })
    return data;
}

async function createApply(opening_id, user_id){
    const apply = {
        opening_id: opening_id,
        user_id: user_id,
    };
    return Apply.create(apply);
};

module.exports = { createApply, readApplyLog };