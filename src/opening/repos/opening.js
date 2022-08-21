const sequelize = require('sequelize');
const db = require('../../../database/models/index');
const Opening = db.job_opening;
const Company = db.company;
const Op = sequelize.Op;

async function createOpening(company_id, position, compensation, content, skill){
    console.log(content);
    const opening = {
        company_id: company_id,
        position: position,
        compensation: compensation,
        content: content,
        skill: skill,
    }
    return Opening.create(opening);
}

async function updateOpening(opening_id, update){
    return Opening.update(update, {
        where: {id: opening_id},
    });
}

async function deleteOpening(opening_id){
    return Opening.destroy({
        where: {id: opening_id},
    })
}

async function readOpening(){
    const data = await Opening.findAll({
        attributes : ['id','position','compensation','skill'],
        include:[{
            model: Company,
            as: 'company',
            attributes: ['name','country','region'],
        }],
        
    })
    return data;
}

async function readOpeningBySearch(search){
    console.log(search);
    const data = await Opening.findAll({
        attributes : ['id','position','compensation','skill'],
        include:[{
            model: Company,
            as: 'company',
            attributes: ['name','country','region'],
            where: {
                name: { [Op.like]: '%' + search + '%' },
            },
        }],
    })
    return data;
}

async function readOpeningDetail(opening_id){
    const data = await Opening.findOne({
        attributes : ['id','position','compensation','skill','content'],
        where: {
            id: opening_id
        },
        include:[{
            model: Company,
            as: 'company',
            attributes: ['id','name','country','region'],
        }],
        
    })
    return data;
}

async function readOpeningByCompanyId(company_id, opening_id){
    const data = await Opening.findAll({
        attributes: ['id'],
        where:{
            company_id: company_id,
            id: {[Op.not] : opening_id},
        },
    })
    return data;
}

module.exports = { createOpening, updateOpening, deleteOpening, readOpening, readOpeningBySearch, readOpeningDetail, readOpeningByCompanyId };