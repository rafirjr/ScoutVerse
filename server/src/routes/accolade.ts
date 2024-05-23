import express from "express";
import {
    addAccolade,
    deleteAccolade,
    getAccolades,
    updateAccolade,
} from "../controllers/scout_accolades";
import middleware from "../middleware";

const router = express.Router();
const { auth } = middleware;

router.post("/:scoutID", auth, addAccolade);
router.get("/:scoutID", auth, getAccolades);
router.put("/:scoutID/accolade/:accoladeID", auth, updateAccolade);
router.delete("/:scoutID/accolade/:accoladeID", auth, deleteAccolade);

export default router;
