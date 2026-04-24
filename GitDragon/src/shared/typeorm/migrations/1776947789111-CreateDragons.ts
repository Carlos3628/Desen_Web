import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDragons1776947789111 implements MigrationInterface {
    name = 'CreateDragons1776947789111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dragons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "nível" integer NOT NULL, "elemento" character varying NOT NULL, "vida" numeric NOT NULL, "poder" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5150462a518a2d66684af866a57" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dragons"`);
    }

}
