import express from "express"
import { deleteLeave, deleteLeaveOfAUser, getAllLeaves, getAllLeavesOfSingleUser, getMyLeaves, newLeave, updateLeave } from "../controllers/leave.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newLeave);
router.get("/me", isAuthenticated, getMyLeaves);
router.get("/admin/all", isAuthenticated, isAdmin, getAllLeaves);
router.get("/admin/:id",isAuthenticated, isAdmin, getAllLeavesOfSingleUser);

router.post("/admin/:id",isAuthenticated,isAdmin, deleteLeave)
router.post("/admin/approve/:id", isAuthenticated, isAdmin, updateLeave);
router.post("/admin/delete/all", isAuthenticated, isAdmin, deleteLeaveOfAUser);

export default router; 