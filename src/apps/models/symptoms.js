const mongoose = require("../../common/database")()

const symptomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const Symptom = mongoose.model('Symptom', symptomSchema);
module.exports = Symptom;
