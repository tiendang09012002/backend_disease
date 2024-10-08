const mongoose = require("../../common/database")()

const inferenceRuleSchema = new mongoose.Schema({
  disease_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease', required: true },
  symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptom', required: true }],
  confidence_level: { type: Number, required: true, min: 0, max: 1 }
});

const InferenceRule = mongoose.model('InferenceRule', inferenceRuleSchema);
module.exports = InferenceRule;
