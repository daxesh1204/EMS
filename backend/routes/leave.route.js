import express from "express";
import authMiddleWare from "../middleware/authMiddleware.js";
import { addLeave, getLeaveAdminShow, getLeaves,getLeaveDetails,updateLeave } from "../controllers/leaveController.js";

const router = express.Router();

router.post("/add", authMiddleWare, addLeave);
router.get("/:id",authMiddleWare,getLeaves);
router.get("/",authMiddleWare,getLeaveAdminShow);
router.get("/detail/:id",authMiddleWare,getLeaveDetails);
router.put("/:id",authMiddleWare,updateLeave);

export default router;
