const mongoose = require('mongoose');


const caseSchema = new mongoose.Schema({
  CaseNumber: Number,
  CaseTitle: String,
  Place: String,
  CaseType: String,
  CaseDetails: String,
  Hearing1: String,
  Hearing2: String,
  Hearing3: String,
  CaseStatus: String,
});


const murderModel = mongoose.model('Murder', caseSchema,'Murder');
module.exports = murderModel ;