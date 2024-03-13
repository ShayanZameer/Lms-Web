import express from "express"
import { deleteAttendence, deleteAttendenceOfAUser, getAllAttendence, getAttendenceOfSingleUser, getMyAttendence, newAttendence, updateAttendence } from "../controllers/attendence.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newAttendence);
router.get("/me", isAuthenticated, getMyAttendence);
router.get("/admin/all", isAuthenticated,isAdmin, getAllAttendence);
router.post("/admin/delete/all", isAuthenticated,isAdmin, deleteAttendenceOfAUser);

router.route("/admin/:id")
  .get(isAuthenticated, isAdmin, getAttendenceOfSingleUser)
  .put(isAuthenticated, isAdmin, updateAttendence)
  .post(isAuthenticated, isAdmin, deleteAttendence)

export default router; 