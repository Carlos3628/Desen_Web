import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlayStationNetworks1782333202722 implements MigrationInterface {
    name = 'CreatePlayStationNetworks1782333202722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playstation_networks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "profile_name" character varying NOT NULL, "psn_id" character varying NOT NULL, "region" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7a1c79e41cdc82f779df06613ef" UNIQUE ("psn_id"), CONSTRAINT "PK_884beb63d5299db13ce959dac7e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "playstation_networks"`);
    }

}
