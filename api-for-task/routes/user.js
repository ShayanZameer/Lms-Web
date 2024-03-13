import express from "express";
import { deleteUser, getAllUsers, getMyDetails, getSingleUser, login, logout, registerUser, updateProfile} from "../controllers/user.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.get("/admin/all", isAuthenticated, isAdmin, getAllUsers)
router.get("/admin/:id", isAuthenticated, isAdmin, getSingleUser)
router.delete("/admin/:id", isAuthenticated, isAdmin, deleteUser)

router.post("/new", registerUser)
router.post("/me/update", updateProfile)
router.post("/login", login)
router.get("/logout", logout)

router.get("/me", isAuthenticated, getMyDetails)

export default router; 