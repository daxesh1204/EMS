import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  fetchEmployeesByDepId,
  getEmployees,
  getEmployeesForView,
  updateEmployee,
  upload,
} from "../controllers/employeeController.js";
const router = express.Router();

router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/getEmp", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployeesForView);
router.put("/:id", authMiddleware, updateEmployee);
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);

export default router;
