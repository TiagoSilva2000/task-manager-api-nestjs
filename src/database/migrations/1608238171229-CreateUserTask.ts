import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTask1608238171229 implements MigrationInterface {
  name = 'CreateUserTask1608238171229'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text, "due_date" date, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()', "deleted_at" TIMESTAMP, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "task"`)
  }
}
