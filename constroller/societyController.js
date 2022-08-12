import Society from "../model/societyModel.js";

const getSocities = async (req, res) => {
  try {
    const data = await Society.find().exec();
    const count = await Society.count();
    console.log(data);
    // .sort({sheetNo:1})
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

const getSociety = async (req, res) => {
  try {
    const result = await Society.findOne({ _id: req.params.id });
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

const deleteSociety = async (req, res) => {
  try {
    await Society.findOneAndDelete({ _id: req.params.id });
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

const createSociety = async (req, res) => {
  const { name, ownerName, status, address } = req.body;
  try {
    const result = await Society.create({
      name,
      ownerName,
      status,
      address,
    });

    res.status(200).json({
      success: "Success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: "Fail",
      message: err.message,
    });
  }
};

const updateSociety = async (req, res) => {
  try {
    const result = await Society.findByIdAndUpdate(req.params.id, req.body, {
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

export const societyController = {
  getSocities,
  getSociety,
  deleteSociety,
  updateSociety,
  createSociety,
};
