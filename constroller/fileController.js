import multer from "multer";
import File from "../model/filemodel.js";
import path from "path";

const __dirname = path.resolve();
const multerStorage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "xlsx") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const uploadfileMiddleware = upload.single("file");

const uploadFile = async (e, req, res, err) => {
  //    const filename = req.body.file
  //    req.body.path = filename
  console.log(err);
};

const getfile = (req, res) => {
  res.sendFile(`uploads/${req.params.id}`, { root: __dirname });
};

const fileController = {
  uploadFile,
  getfile,
  uploadfileMiddleware,
};

export default fileController;
