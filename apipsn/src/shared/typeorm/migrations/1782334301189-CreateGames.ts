import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGames1782334301189 implements MigrationInterface {
    name = 'CreateGames1782334301189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "developer" character varying NOT NULL, "psn_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_012a2c0d97a364424589bd87bb4" FOREIGN KEY ("psn_id") REFERENCES "playstation_networks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_012a2c0d97a364424589bd87bb4"`);
        await queryRunner.query(`DROP TABLE "games"`);
    }

}
