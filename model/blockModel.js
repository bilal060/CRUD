import mongoose from "mongoose";

const BlocekSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  ownerName: {
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
});

const Block = mongoose.model("Block", BlocekSchema);

export default Block;
