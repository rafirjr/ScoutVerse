import express from "express";
import cors from "cors";
import "express-async-errors";
import middleware from "./middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(middleware.unknownEndPointHandler);

export default app;
