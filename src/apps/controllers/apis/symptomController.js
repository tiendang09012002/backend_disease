const Symptom = require('../../models/symptoms');

const createSymptom = async (req, res) => {    
    try {
        const symptoms = new Symptom(req.body);
        await symptoms.save();
        res.status(201).json(symptoms);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllSymptoms = async (req, res) => {
    try {
        const symptoms = await Symptom.find();
        res.json(symptoms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    createSymptom,
    getAllSymptoms
};