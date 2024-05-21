import express from "express";
import cors from "cors";
import "express-async-errors";
import middleware from "./middleware";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import scoutRoutes from "./routes/scout";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/scouts", scoutRoutes);

app.use(middleware.unknownEndPointHandler);
app.use(middleware.errorHandler);

export default app;
