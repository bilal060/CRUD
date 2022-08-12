import Phase from "../model/phaseModel.js";
import Society from "../model/societyModel.js";

const getPhases = async (req, res) => {
  try {
    const data = await Phase.find()
      .populate("society")
      .limit(req.query.limit)
      .skip(+req.query.offset);
    const count = await Phase.count();
    res.status(200).json({
      status: "Success",
      data,
      count,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const getPhaseById = async (req, res) => {
  try {
    const result = await Phase.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

const deletePhase = async (req, res) => {
  try {
    await Phase.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

const createPhase = async (req, res) => {
  const { name, ownerName, status, address, society } = req.body;
  try {
    const Societyy = await Society.findOne({ _id: society });
    if (Societyy) {
      const result = await Phase.create({
        name,
        ownerName,
        status,
        address,
        society,
      });

      res.status(200).json({
        success: "Success",
        data: result,
      });
    } else {
      res.status(200).json({
        success: "Fail",
        message: "Society Not Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "Fail",
      message: err.message,
    });
  }
};

const updatePhase = async (req, res) => {
  try {
    const result = await Phase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: "Success",
      result,
    });
  } catch (err) {
    res.status(200).json({
      success: "Fail",
      message: err,
    });
  }
};

export const PhaseController = {
  getPhases,
  getPhaseById,
  deletePhase,
  updatePhase,
  createPhase,
};
