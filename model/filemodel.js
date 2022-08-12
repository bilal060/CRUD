import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'A tour must have name'] ,
  },
  path: {
    type: String,
  },
});

const File = mongoose.model("File", fileSchema);

export default File;
