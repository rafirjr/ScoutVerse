import { Request, Response } from "express";
import { Scout } from "../entity/Scout";
import { Attendance } from "../entity/Attendance";

// Get all attendance records from a specific scout
export const getScoutAttendance = async (req: Request, res: Response) => {
    const scoutID = req.params.scoutID;
    console.log(scoutID);

    const scout = await Scout.findOne({
        where: {
            id: scoutID,
        },
    });

    if (!scout) {
        return res.status(404).send({ message: "Invalid scout ID." });
    }

    const attendance = await Attendance.find({
        where: {
            scout: {
                id: scoutID,
            },
        },
    });

    res.status(201).json(attendance);
};

// Get all attendance records from a specific date
export const getDateAttendance = async (req: Request, res: Response) => {
    const date = req.params.date;

    const attendance = await Attendance.find({
        where: {
            present_date: date,
        },
    });

    res.status(201).json(attendance);
};

// Put an attendance record for a scout
export const logAttendance = async (req: Request, res: Response) => {
    const scoutID = req.params.scoutID;
    const body = req.body;

    const scout = await Scout.findOne({
        where: {
            id: scoutID,
        },
    });

    if (!scout) {
        return res.status(400).send({ message: "Invalid scout ID." });
    }

    const newAttendance = Attendance.create({
        scout_id: scoutID,
        present_date: body.present_date,
        daraz: body.daraz,
        paid: body.paid,
    });

    try {
        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Could not log attendance." });
    }
};

// Update an attendance record for a scout
export const updateAttendance = async (req: Request, res: Response) => {
    const body = req.body;
    const scoutID = req.params.scoutID;
    const attendanceID = req.params.attendanceID;

    if (!body) {
        return res
            .status(400)
            .send({ message: "body field must not be empty." });
    }

    const scout = await Scout.findOne({
        where: {
            id: scoutID,
        },
    });

    if (!scout) {
        return res.status(404).send({ message: "Invalid scout ID." });
    }

    const attendance = await Attendance.findOne({
        where: {
            attendance_id: attendanceID,
        },
    });

    if (!attendance) {
        return res.status(404).send({ message: "Invalid attendance ID." });
    }

    const updatedAttendance = await Attendance.update(attendanceID, body);
    res.status(200).json(updatedAttendance);
};

// Delete an attendance record for a scout
export const deleteAttendance = async (req: Request, res: Response) => {
    const attendanceID = req.params.attendanceID;

    const attendance = await Attendance.findOne({
        where: {
            attendance_id: attendanceID,
        },
    });

    if (!attendance) {
        return res.status(404).send({ message: "Invalid attendance ID." });
    }

    Attendance.remove(attendance);
    res.status(204).send({ message: "Successfully removed attendance." });
};
