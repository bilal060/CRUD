import Property from "../model/propertyModel.js";
import { extractor } from "../helper/extractor.js";
import Society from "../model/societyModel.js";
import Phase from "../model/phaseModel.js";
import Block from "../model/blockModel.js";

const getProperties = async (req, res) => {
  try {
    const data = await Property.find()
      .populate("phase")
      .populate("society")
      .populate("block")
      .limit(req.query.limit)
      .skip(+req.query.offset);
    const count = await Property.count();

    // .sort({sheetNo:1})
    res.status(200).json({
      status: "Success",
      data,
      count,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

const getProperty = async (req, res) => {
  try {
    const Property = await Property.findOne({ _id: req.params.id }); // IS Equal to = Property.findOne({_id: req.params.id})
    res.status(200).json({
      status: "Success",
      data: {
        data: Property,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    await Property.findOneAndDelete({ _id: req.params.id }); // IS Equal to = Property.findOne({_id: req.params.id})
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

const createProperty = async (req, res) => {
  const rowsData = await extractor(req.body.file);
  try {
    let data = [];
    // static object
    await rowsData.forEach((item, index) => {
      data.push({
        sheetNo: item[0],
        catg: item[1],
        type: item[2],
        size: item[3],
        ownersName: item[4],
        mobileNo: item[5],
        secondMobileNo: item[6],
        plotNo: item[8],
        secNo: item[9],
        communityCenter: item[10],
        refNo: item[11],
        emailId: item[12],
        cnicNo: item[13],
        mem: item[14],
      });
    });

    const result = await Property.create(data);

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

const createOneProperty = async (req, res) => {
  const {
    sheetNo,
    catg,
    type,
    size,
    ownersName,
    mobileNo,
    secondMobileNo,
    plotNo,
    secNo,
    communityCenter,
    refNo,
    emailId,
    cnicNo,
    mem,
    status,
    society,
    phase,
    block,
  } = req.body;
  try {
    const Societyy = await Society.findOne({
      _id: society,
    });
    const Phasee = await Phase.findOne({ _id: phase });
    const blocks = await Block.findOne({ _id: block });
    if (Societyy && Phasee && blocks) {
      const result = await Property.create({
        sheetNo,
        catg,
        type,
        size,
        ownersName,
        mobileNo,
        secondMobileNo,
        plotNo,
        secNo,
        communityCenter,
        refNo,
        emailId,
        cnicNo,
        mem,
        status,
        society,
        phase,
        block,
      });
      res.status(200).json({
        success: "Success",
        data: result,
      });
    } else if (!Societyy) {
      res.status(400).json({
        success: "Fail",
        message: "Society not found",
      });
    } else if (!Phasee) {
      res.status(400).json({
        success: "Fail",
        message: "Phase not found",
      });
    } else if (!blocks) {
      res.status(400).json({
        success: "Fail",
        message: "Block not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "Fail",
      message: err.message,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const Property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: "Success",
    });
  } catch (err) {
    res.status(200).json({
      success: "Fail",
      message: err,
    });
  }
};

export const propertyController = {
  getProperty,
  getProperties,
  deleteProperty,
  updateProperty,
  createProperty,
  createOneProperty,
};
