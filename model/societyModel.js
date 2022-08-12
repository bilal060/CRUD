import mongoose from "mongoose";

const SocietySchema = new mongoose.Schema({
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
});

const Society = mongoose.model("Society", SocietySchema);

export default Society;
