import { Request, Response } from "express";
import { Scout } from "../entity/Scout";
import { ILike } from "typeorm";

enum Khoump {
    KYLIG = "kylig",
    ARDZVIG = "ardzvig",
    ARI = "ari",
    ARENOUSH = "arenoush",
    YERETS = "yerets",
    BARMANOUHI = "barmanouhi",
    KERAKOUYN = "kerakouyn",
}

export const getAllScouts = async (req: Request, res: Response) => {
    const scouts = await Scout.find();
    res.json(scouts);
};

export const getScoutGroup = async (req: Request, res: Response) => {
    const group = req.body;

    if (!Object.values(Khoump).includes(group)) {
        return res
            .status(401)
            .send({ message: "Passed in Khoump does not exist." });
    }

    const scoutKhoump = await Scout.find({
        where: {
            khoump: ILike(group),
        },
    });

    res.status(201).json(scoutKhoump);
};

export const getScout = async (req: Request, res: Response) => {
    const scoutID = req.params;

    const scout = await Scout.findOne(scoutID);

    if (!scout) {
        return res.status(404).send({ message: "Invalid scout ID." });
    }

    res.status(201).json(scout);
};

export const deleteScout = async (req: Request, res: Response) => {
    const scoutID = req.params;

    const scout = await Scout.findOne(scoutID);
    if (!scout) {
        return res.status(404).send({ message: "Invalid scout ID." });
    }

    scout.status = "INACTIVE";
    res.status(204).end();
};

export const addScout = async (req: Request, res: Response) => {
    const { body } = req.body;

    if (!body) {
        return res
            .status(400)
            .send({ message: "Body field must not be empty." });
    }

    const newScout = Scout.create({
        first_name: body.first_name,
        last_name: body.last_name,
        khoump: body.khoump,
        date_of_birth: body.date_of_birth,
        street: body.street,
        city: body.city,
        state: body.state,
        zip_code: body.zip_code,
        contact_number: body.contact_number,
        contact_email: body.contact_email,
        parent_name: body.parent_name,
        parent_email: body.parent_email,
        parent_number: body.parent_number,
        allergies: body.allergies,
        size: body.size,
        status: "ACTIVE",
    });

    try {
        await newScout.save();
        res.status(201).json(newScout);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Could not add new scout." });
    }
};

export const updateScout = async (req: Request, res: Response) => {
    const { body } = req.body;
    const scoutID = req.params;

    if (!body) {
        return res
            .status(400)
            .send({ message: "Body field must not be empty." });
    }

    const scout = await Scout.findOne(scoutID);

    if (!scout) {
        return res.status(404).send({ message: "Invalid scout ID." });
    }

    const updatedScout = await Scout.update(scoutID, body);
    res.status(200).json(updatedScout);
};
