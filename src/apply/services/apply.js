const applyRepo = require('../repos/apply');

async function applyOpening(req, res){
    try {
      const opening_id = req.params.id;
      const user_id = req.body.user_id;
      const data = await applyRepo.readApplyLog(opening_id, user_id);
      if(data){
        return res.status(200).json({ message : 'APPLY IS ALREADY EXISTED' });
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