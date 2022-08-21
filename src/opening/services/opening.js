const openingRepo = require('../repos/opening');

async function createOpening(req, res) {
    try {
      const { company_id, position, compensation, content, skill } = req.body;
      openingRepo.createOpening(company_id, position, compensation, content, skill);
      return res.status(201).json({ message : 'OPENING IS CREATED' });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

async function updateOpening(req, res) {
  try {
    const opening_id = req.params.id;
    const update = req.body;
    const opening = await openingRepo.readOpeningById(opening_id);
    if(!opening){
      return res.status(404).json({ message : 'OPENING IS NOT FOUND' });
    }
    else if(req.body.company_id){
      return res.status(403).json({ message : 'CAN NOT UPDATE COMPANY_ID' });
    }
    else{
      openingRepo.updateOpening(opening_id, update);
      return res.status(200).json({ message : 'OPENING IS UPDATED' });
    }  
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function deleteOpening(req, res) {
  try {
    const opening_id = req.params.id;
    const opening = await openingRepo.readOpeningById(opening_id);
    if(opening){
      openingRepo.deleteOpening(opening_id);
      return res.status(200).json({ message : 'OPENING IS DELETED' });
    }
    else{
      return res.status(404).json({ message : 'OPENING IS NOT FOUND' });
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function readOpening(req, res) {
  try {
    const { search } = req.query;
    let data;
    if(search == undefined){
      data = await openingRepo.readOpening();
    }
    else{
      data = await openingRepo.readOpeningBySearch(search);
    }
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function readOpeningDetail(req, res) {
  try {
    const opening_id = req.params.id;//not found
    const detail = await openingRepo.readOpeningDetail(opening_id);
    if(detail){
      const list = await openingRepo.readOpeningByCompanyId(detail.company.id, opening_id);
      let arr = list.map(a=>a.id);
      const data = {
        '채용공고_id': detail.id,
        '회사명': detail.company.name,
        '국가': detail.company.country,
        '지역': detail.company.region,
        '채용포지션': detail.position,
        '채용보상금': detail.compensation,
        '사용기술': detail.skill,
        '채용내용': detail.content,
        '회사가올린다른채용공고': arr,
      }
      return res.status(200).json(data);
    }
    else{
      return res.status(404).json({ message : 'OPENING IS NOT FOUND' });
    }  
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}



module.exports = { createOpening, updateOpening, deleteOpening, readOpening, readOpeningDetail };