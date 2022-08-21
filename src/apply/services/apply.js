const applyRepo = require('../repos/apply');
const openingRepo = require('../../opening/repos/opening');

async function applyOpening(req, res){
    try {
      const opening_id = req.params.id;
      const user_id = req.body.user_id;
      const data = await applyRepo.readApplyLog(opening_id, user_id);
      const opening = await openingRepo.readOpeningById(opening_id);
      if(!opening){
        return res.status(404).json({ message : 'OPENING IS NOT FOUND' });
      }
      else if(data){
        return res.status(409).json({ message : 'APPLY IS ALREADY EXISTED' });
      }else{
        applyRepo.createApply(opening_id, user_id);
        return res.status(200).json({ message : 'APPLY COMPLETED' });
      }
      
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  }

  module.exports = { applyOpening };