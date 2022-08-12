import express from "express";
import fileController from "../constroller/fileController.js";

const router = express.Router();

router
  .route("/")
  .post(fileController.uploadfileMiddleware, fileController.uploadFile);

router.route("/:id").get(fileController.getfile);

export default router;
