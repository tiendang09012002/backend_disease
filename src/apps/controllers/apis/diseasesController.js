const Disease = require('../../models/diseases');

const createDisease = async (req, res) => {    
    try {
        const disease = new Disease(req.body);
        await disease.save();
        res.status(201).json(disease);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createDisease,
};