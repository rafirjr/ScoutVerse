import "reflect-metadata";
import { DataSource } from "typeorm";

const ormConfig = require("../ormconfig");
const { type, url, entities, synchronize, logging } = ormConfig;

const connectToDB = new DataSource({
    type: type,
    url: url,
    logging: logging,
    synchronize: synchronize,
    entities: entities,
    migrations: ["src/migration/*.ts"],
});

connectToDB
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized.");
    })
    .catch((err) => {
        console.error("Data Source initialization error", err);
    });

export default connectToDB;
