const mongoose=require("mongoose")
const PolicecrossSchema=new mongoose.Schema({
    
    firid: { type: String, required: true },
  });
const PolicecrossModel = mongoose.model('Policerejectedfirs', PolicecrossSchema);
module.exports = PolicecrossModel;