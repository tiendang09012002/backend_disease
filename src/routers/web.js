const express = require("express");
const router = express.Router();
const diseaseController = require("../apps/controllers/apis/diseasesController");
const symptomController = require("../apps/controllers/apis/symptomController");
const interenceRuleController = require("../apps/controllers/apis/interence_ruleController");
// Diseases API
router.post("/create_diseae", diseaseController.createDisease);

// SYmptoms API
router.post("/create_symptom", symptomController.createSymptom);
router.get("/get_all_symptoms", symptomController.getAllSymptoms);
// Interence Rules API
router.post("/create_inference_rule", interenceRuleController.createInterence);
router.post('/infer_disease', interenceRuleController.diagnoseDisease);
module.exports = router;