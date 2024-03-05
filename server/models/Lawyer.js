// Lawyer.js
const mongoose = require('mongoose');

const AdvocateSchema = new mongoose.Schema({
  Name: String,
  email: String,
  mobileNo: String,
  dob: String,
  gender: String,
  typeofadvocate: String,
  court: String,
  barcouncilregistration: String,
  loginId: String,
  password: String,
  confirmPassword: String,
  role: {
    type: String,
    default: 'visitor',
  },
});

const AdvocateModel = mongoose.model('Advocate', AdvocateSchema); // Change the model name
module.exports = AdvocateModel;