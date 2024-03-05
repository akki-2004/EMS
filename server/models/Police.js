const mongoose = require('mongoose');

const PoliceSchema = new mongoose.Schema({
  Name: String,
  email: String,
  mobileNo: String,
  dob: String,
  city: String,
  state: String,
  district: String,
  pincode: String,
  loginId: String,
  password: String,
  confirmPassword: String,
  department: String,
  designation: String,
  idNumber: String,
  policeStation: String,
  role: {
    type: String,
    default: 'visitor',
  },
});

const PoliceModel = mongoose.model('police', PoliceSchema);
module.exports = PoliceModel;