import express from "express";
import middleware from "../middleware";
import {
    deleteAttendance,
    getAttendance,
    logAttendance,
    updateAttendance,
} from "../controllers/scout_attendance";

const router = express.Router();
const { auth } = middleware;

router.get("/:scoutID", auth, getAttendance);
router.post("/:scoutID", auth, logAttendance);
router.delete("/:scoutID/attendance/:attendanceID", auth, deleteAttendance);
router.put("/:scoutID/attendance/:attendanceID", auth, updateAttendance);

export default router;
