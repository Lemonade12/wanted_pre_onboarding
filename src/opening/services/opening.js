const openingRepo = require('../repos/opening');

async function createOpening(req, res) {
    try {
      const { company_id, position, compensation, content, skill } = req.query;
      openingRepo.createOpening(company_id, position, compensation, content, skill);
      return res.status(200).json({ message : 'OPENING IS CREATED' });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

async function updateOpening(req, res) {
  try {
    const opening_id = req.params.id;
    const update = req.body;
    console.log(opening_id);
    console.log(update);
    openingRepo.updateOpening(opening_id, update);
    return res.status(200).json({ message : 'OPENING IS UPDATED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function deleteOpening(req, res) {
  try {
    const opening_id = req.params.id;
    openingRepo.deleteOpening(opening_id);
    return res.status(200).json({ message : 'OPENING IS DELETED' });
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
      console.log('aaaa');
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
    const opening_id = req.params.id;
    const detail = await openingRepo.readOpeningDetail(opening_id);
    const list = await openingRepo.readOpeningByCompanyId(detail.company.id, opening_id);
    //해당 채용공고 id는 빠져야한다
    const data = {
      '채용공고_id': detail.id,
      '회사명': detail.company.name,
      '국가': detail.company.country,
      '지역': detail.company.region,
      '채용포지션': detail.position,
      '채용보상금': detail.compensation,
      '사용기술': detail.skill,
      '채용내용': detail.content,
      '회사가올린다른채용공고': list,

    }
    
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function applyOpening(req, res){
  try {
    const opening_id = req.params.id;
    const user_id = req.body;
    openingRepo.deleteOpening(opening_id);
    return res.status(200).json({ message : 'OPENING IS DELETED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { createOpening, updateOpening, deleteOpening, readOpening, readOpeningDetail };