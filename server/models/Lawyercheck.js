const mongoose = require('mongoose');

const LawyercheckSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Mobile: String,
  DOB: String,
  Gender:String,
  TypeofAdvocate: String,
  TypeofCourt: String,
  BarCouncilRegistrationNumber: String,
  YearsofExperience:String,
  Ratings:String,
  CasesSolved:String,
  Qualifications:String,
  Address:String
});

const LawyercheckModel = mongoose.model('Advocate_database', LawyercheckSchema,'Advocate_database');
module.exports = LawyercheckModel;