import mongoose from "mongoose";
import Block from "../model/blockModel.js";
import Phase from "../model/phaseModel.js";
import Society from "../model/societyModel.js";
import { ObjectId } from "mongodb";
const getBlocks = async (req, res) => {
  try {
    const data = await Block.find()
      .populate("phase")
      .populate("society")
      .limit(req.query.limit)
      .skip(+req.query.offset);
    const count = await Block.count();
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

const getBlock = async (req, res) => {
  try {
    const result = await Block.findOne({ _id: req.params.id })
      .populate("phase")
      .populate("society");
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

const deleteBlock = async (req, res) => {
  try {
    await Block.findOneAndDelete({ _id: req.params.id });
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

const createBlock = async (req, res) => {
  const { name, ownerName, status, society, phase } = req.body;
  try {
    const Societyy = await Society.findOne({
      _id: society,
    });
    const Phasee = await Phase.findOne({ _id: phase });

    if (Societyy && Phasee) {
      const result = await Block.create({
        name,
        ownerName,
        status,
        society,
        phase,
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
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: "Fail",
      message: err.message,
    });
  }
};

const updateBlock = async (req, res) => {
  try {
    const result = await Block.findByIdAndUpdate(req.params.id, req.body, {
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

export const BlockController = {
  getBlocks,
  getBlock,
  deleteBlock,
  updateBlock,
  createBlock,
};
