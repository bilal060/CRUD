import mongoose from "mongoose";

const PhaseSchema = new mongoose.Schema({
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
  address: {
    type: String,
  },
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Society",
  },
});

const Phase = mongoose.model("Phase", PhaseSchema);

export default Phase;
