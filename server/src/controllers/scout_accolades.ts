import { Request, Response } from "express";
import { ScoutAccolades } from "../entity/ScoutAccolades";
import { Scout } from "../entity/Scout";

// Add an accolade to a scout
export const addAccolade = async (req: Request, res: Response) => {
    const body = req.body;
    const scoutID = req.params.scoutID;

    if (!body) {
        return res
            .status(400)
            .send({ message: "Body field must not be empty." });
    }

    const scout = await Scout.findOne({
        where: {
            id: scoutID,
        },
    });

    if (!scout) {
        return res.status(400).send({ message: "Invalid scout ID." });
    }

    const newAccolade = ScoutAccolades.create({
        scout_id: scoutID,
        gark_accolade: body.gark_accolade,
        gark_date: body.gark_date,
        astijan_accolade: body.astijan_accolade,
        astijan_date: body.astijan_date,
        bashdon_accolade: body.bashdon_accolade,
        bashdon_date: body.bashdon_date,
    });

    try {
        await newAccolade.save();
        res.status(201).json(newAccolade);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Could not add new accolade." });
    }
};

// Get all accolades from specific scout
export const getAccolades = async (req: Request, res: Response) => {
    const scoutID = req.params.scoutID;

    const scout = await Scout.findOne({
        where: {
            id: scoutID,
        },
    });

    if (!scout) {
        return res.status(404).send({ message: "Invalid scout ID." });
    }

    const accolades = await ScoutAccolades.find({
        where: {
            scout_id: scoutID,
        },
    });

    res.status(201).json(accolades);
};

// Edit an accolade to a scout
export const updateAccolade = async (req: Request, res: Response) => {
    const body = req.body;
    const scoutID = req.params.scoutID;
    const accoladeID = req.params.accoladeID;

    if (!body) {
        return res
            .status(400)
            .send({ message: "Body field must not be empty." });
    }

    const scout = await Scout.findOne({
        where: {
            id: scoutID,
        },
    });

    if (!scout) {
        return res.status(404).send({ message: "Invalid scout ID." });
    }

    const accolade = await ScoutAccolades.findOne({
        where: {
            accolade_id: accoladeID,
        },
    });

    if (!accolade) {
        return res.status(404).send({ message: "Invalid accolade ID." });
    }

    const updatedAccolade = await ScoutAccolades.update(accoladeID, body);
    res.status(200).json(updatedAccolade);
};

// Delete an accolade
export const deleteAccolade = async (req: Request, res: Response) => {
    const scoutID = req.params.scoutID;
    const accoladeID = req.params.accoladeID;

    const scout = await Scout.findOne({
        where: {
            id: scoutID,
        },
    });

    if (!scout) {
        return res.status(404).send({ message: "Invalid scout ID." });
    }

    const accolade = await ScoutAccolades.findOne({
        where: {
            accolade_id: accoladeID,
        },
    });

    if (!accolade) {
        return res.status(404).send({ message: "Invalid accolade ID." });
    }

    ScoutAccolades.remove(accolade);
    res.status(204).send({ message: "Successfully removed accolade." });
};
