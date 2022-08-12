import express from "express";
import { societyController } from "../constroller/societyController.js";

const router = express.Router();

router
  .route("/")
  .get(societyController.getSocities)
  .post(societyController.createSociety);
router
  .route("/:id")
  .get(societyController.getSociety)
  .delete(societyController.deleteSociety)
  .put(societyController.updateSociety);

export default router;
