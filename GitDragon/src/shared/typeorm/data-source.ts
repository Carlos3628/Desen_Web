import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import Dragon from "@modules/dragons/typeorm/entities/Dragon";

export const AppDataSource = new DataSource({
 type: "postgres",
 host: "localhost", // se Node está fora do Docker
 port: 5433,
 username: "postgres",
 password: "docker",
 database: "dragonapi",
 synchronize: true, // sempre false em produção/migrations
 logging: false,
 entities: [Dragon],
 migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")],
 subscribers: [],
});