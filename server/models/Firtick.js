const mongoose = require('mongoose');

const policetickSchema = new mongoose.Schema({

  firid: { type: String, required: true },
});

const PolicetickModel = mongoose.model('Policeacceptedfirs', policetickSchema);

module.exports = PolicetickModel;
