import Product from "@modules/products/typeorm/entities/Product";
import path from "node:path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433, //5433
    username: "postgres",
    password: "docker",
    database: "apivendastb",
    synchronize: false,
    logging: true,
    entities: [Product],
    migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")]
});