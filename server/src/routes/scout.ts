import express from "express";
import {
    getAllScouts,
    getScout,
    deleteScout,
    updateScout,
    addScout,
    getScoutGroup,
} from "../controllers/scout";
import middleware from "../middleware";

const router = express.Router();
const { auth } = middleware;

router.get("/", auth, getAllScouts);
router.get("/:group", auth, getScoutGroup);
router.get("/:scoutID", auth, getScout);
router.post("/", auth, addScout);
router.put("/:scoutID", auth, updateScout);
router.delete("/:scoutID", auth, deleteScout);

export default router;
