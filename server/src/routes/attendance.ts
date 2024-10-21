import express from "express";
import middleware from "../middleware";
import {
    deleteAttendance,
    getDateAttendance,
    getScoutAttendance,
    logAttendance,
    updateAttendance,
} from "../controllers/scout_attendance";

const router = express.Router();
const { auth } = middleware;

router.get("/:date", auth, getDateAttendance);
router.get("/:scoutID", auth, getScoutAttendance);
router.post("/:scoutID", auth, logAttendance);
router.delete("/:scoutID/attendance/:attendanceID", auth, deleteAttendance);
router.put("/:scoutID/attendance/:attendanceID", auth, updateAttendance);

export default router;
