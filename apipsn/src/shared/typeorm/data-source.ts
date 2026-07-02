import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import User from "@modules/users/typeorm/entities/User";
import PlayStationNetwork from "@modules/psn/typeorm/entities/PlayStationNetwork";
import Game from "@modules/gamesp/typeorm/entities/Game";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "psn_db",
  synchronize: false,
  logging: false,
  entities: [User, PlayStationNetwork, Game], 
  migrations: [path.join(__dirname, "migrations", "*.ts")],
  subscribers: [],
});