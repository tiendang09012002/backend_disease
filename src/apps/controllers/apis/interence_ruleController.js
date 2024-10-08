const Interence = require("../../models/inference_rules");

const createInterence = async (req, res) => {
  try {
    const interences = new Interence(req.body);
    await interences.save();
    res.status(201).json(interences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const diagnoseDisease = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res
        .status(400)
        .json({ message: "Vui lòng chọn ít nhất một triệu chứng." });
    }

    // Tìm các quy tắc có ít nhất 1 triệu chứng khớp với triệu chứng người dùng chọn
    const inferenceRules = await Interence.find({
      symptoms: { $in: symptoms },
    }).populate("disease_id"); // Lấy thông tin bệnh từ `disease_id`

    if (inferenceRules.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy bệnh phù hợp với các triệu chứng đã chọn.",
      });
    }

    // Tạo một map để đếm số lượng triệu chứng khớp với từng bệnh
    const diseaseMatchCount = {};

    inferenceRules.forEach((rule) => {
      const matchedSymptomsCount = rule.symptoms.filter((symptomId) =>
        symptoms.includes(symptomId.toString())
      ).length; // Đếm số triệu chứng khớp
      
      const diseaseId = rule.disease_id._id.toString();
      const confidence_level = rule.confidence_level;

      if (!diseaseMatchCount[diseaseId]) {
        diseaseMatchCount[diseaseId] = {
          disease: rule.disease_id,
          matchedSymptomsCount: 0,
          confidence_level: confidence_level,
        };
      }

      diseaseMatchCount[diseaseId].matchedSymptomsCount += matchedSymptomsCount;
    });

    // Lấy số lượng triệu chứng khớp lớn nhất
    const maxMatchedSymptomsCount = Math.max(
      ...Object.values(diseaseMatchCount).map(d => d.matchedSymptomsCount)
    );

    // Lấy tất cả các bệnh có số triệu chứng khớp bằng với maxMatchedSymptomsCount
    const bestMatches = Object.values(diseaseMatchCount).filter(
      (current) => current.matchedSymptomsCount === maxMatchedSymptomsCount
    ).map(({ disease, matchedSymptomsCount, confidence_level }) => ({
      disease: disease.name,
      description: disease.description,
      treatment: disease.treatment,
      confidence_level: confidence_level,
      matchedSymptomsCount: matchedSymptomsCount,
    }));

    if (bestMatches.length > 0) {
      return res.status(200).json({
        message: "Các bệnh có khả năng cao nhất",
        diseases: bestMatches,
      });
    }

    res.status(404).json({
      message: "Không tìm thấy bệnh phù hợp với các triệu chứng đã chọn.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInterence,
  diagnoseDisease,
};
