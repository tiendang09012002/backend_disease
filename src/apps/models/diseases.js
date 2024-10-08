const mongoose = require("../../common/database")()

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  treatment: { type: String, required: true }
});

const Disease = mongoose.model('Disease', diseaseSchema);
module.exports = Disease;
