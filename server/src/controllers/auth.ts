import { Request, Response } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../utils/config";
import { registerValidator, loginValidator } from "../utils/validators";
import { ILike } from "typeorm";
import connectToDB from "../db";

export const signUpUser = async (req: Request, res: Response) => {
    const { firstname, lastname, username, password } = req.body;
    const { errors, valid } = registerValidator(username, password);

    if (!valid) {
        return res.status(400).send({ message: Object.values(errors)[0] });
    }

    const existingUser = await connectToDB.manager.findOne(User, {
        where: {
            username: ILike(username),
        },
    });

    if (existingUser) {
        return res
            .status(401)
            .send({ message: `Username '${username}' is already taken.` });
    } else {
        //res.send({ message: "Username is not taken." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = User.create({ firstname, lastname, username, passwordHash });
    await user.save();

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        JWT_SECRET
    );

    return res.status(201).json({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        token,
    });
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const { errors, valid } = loginValidator(username, password);

    if (!valid) {
        return res.status(400).send({ message: Object.values(errors)[0] });
    }

    const user = await User.findOne({
        where: {
            username: ILike(username),
        },
    });

    if (!user) {
        return res
            .status(401)
            .send({ message: `User: '${username}' not found. ` });
    }

    const credentialsValid = await bcrypt.compare(password, user.passwordHash);

    if (!credentialsValid) {
        return res.status(401).send({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET
    );
    return res.status(201).json({
        id: user.id,
        username: user.username,
        token,
        firstname: user.firstname,
        lastname: user.lastname,
    });
};
