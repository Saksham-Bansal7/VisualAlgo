import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createFlowchart,
  getUserFlowcharts,
  deleteFlowchart,
  editFlowchart,
  getFlowchartById,
} from "../controllers/sourceCodeController.js";

const flowchartRouter = express.Router();

flowchartRouter.post("/", protect, createFlowchart);
flowchartRouter.get("/", protect, getUserFlowcharts);
flowchartRouter.get("/:id", protect, getFlowchartById);
flowchartRouter.put("/:id", protect, editFlowchart);
flowchartRouter.delete("/:id", protect, deleteFlowchart);

export default flowchartRouter;
