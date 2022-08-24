const sequelize = require('sequelize');
const db = require('../../../database/models/index');
const Opening = db.job_opening;
const Company = db.company;
const Op = sequelize.Op;

async function readCompanyById(company_id){
    const data = await Company.findOne({
        where : {id: company_id},
    })
    return data;
}

async function createOpening(company_id, position, compensation, content, skill){
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
        attributes : [
            ['id', '채용공고_id'],
            [sequelize.col('company.name'),'회사명'],
            [sequelize.col('company.country'),'국가'],
            [sequelize.col('company.region'),'지역'],
            ['position', '채용포지션'],
            ['compensation', '채용보상금'],
            ['skill', '사용기술']
        ],
        include:[{
            model: Company,
            as: 'company',
            attributes: [],
        }],
        order:[
            ['id','ASC'],
        ],
    })
    return data;
}

async function readOpeningById(opening_id){
    const data = await Opening.findOne({
        where:{
            id: opening_id,
        }
    })
    return data;
}

async function readOpeningBySearch(search){
    const data = await Opening.findAll({
        attributes : [
            ['id', '채용공고_id'],
            [sequelize.col('company.name'),'회사명'],
            [sequelize.col('company.country'),'국가'],
            [sequelize.col('company.region'),'지역'],
            ['position', '채용포지션'],
            ['compensation', '채용보상금'],
            ['skill', '사용기술']
        ],
        include:[{
            model: Company,
            as: 'company',
            attributes: [],
            
        }],
        where:{
            [Op.or]: [
                {
                    '$company.name$': {
                        [Op.like]: "%" + search + "%"
                    }
                },
                {
                    skill: {
                        [Op.like]: "%" + search + "%"
                    }
                }
            ]
        },
        order:[
            ['id','ASC'],
        ],
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
        order:[
            ['id','ASC'],
        ],
    })
    return data;
}

module.exports = { readCompanyById, createOpening, updateOpening, deleteOpening, readOpening, readOpeningById, readOpeningBySearch, readOpeningDetail, readOpeningByCompanyId };