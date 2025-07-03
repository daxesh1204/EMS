import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addDepartment, deleteDepartment, getDepartmentforUpdate, getDepartments, updateDepartment } from "../controllers/departmentController.js";
const router= express.Router();

router.post('/add',authMiddleware,addDepartment);
router.get('/get',authMiddleware,getDepartments);
router.get('/:id',authMiddleware,getDepartmentforUpdate);
router.put('/:id',authMiddleware,updateDepartment);
router.delete('/:id',authMiddleware,deleteDepartment);
export default router;