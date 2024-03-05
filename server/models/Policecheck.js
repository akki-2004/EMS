const mongoose = require('mongoose');

const PolicecheckSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Mobile: String,
  DOB: String,
  Gender:String,
  Department: String,
  Designation: String,
  IDNumber: String,
  Area: String,
});

const PolicecheckModel = mongoose.model('employee', PolicecheckSchema);
module.exports = PolicecheckModel;