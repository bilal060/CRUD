import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  sheetNo: {
    type: Number,
  },
  catg: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Residential", "Commercial"],
    default: "Residential",
  },
  size: {
    type: Number,
  },
  ownersName: {
    type: String,
  },
  mobileNo: {
    type: Number,
  },
  secondMobileNo: {
    type: String,
  },

  plotNo: {
    type: Number,
  },
  secNo: {
    type: String,
  },
  communityCenter: {
    type: String,
  },
  refNo: {
    type: String,
  },
  emailId: {
    type: String,
  },
  cnicNo: {
    type: String,
  },
  mem: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "InActive"],
    default: "InActive",
  },
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Society",
  },
  phase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Phase",
  },
  block: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Block",
  },
});

const Property = mongoose.model("property", PropertySchema);

export default Property;
