import { MigrationInterface, QueryRunner } from 'typeorm'

export class TaskUserFK1608245116785 implements MigrationInterface {
  name = 'TaskUserFK1608245116785'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" ADD "user_id" integer`)
    await queryRunner.query(`COMMENT ON COLUMN "task"."created_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "created_at" SET DEFAULT 'now()'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."updated_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`
    )
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`
    )
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "updated_at" SET DEFAULT '2020-12-17 20:50:31.348729'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."updated_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "created_at" SET DEFAULT '2020-12-17 20:50:31.348729'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."created_at" IS NULL`)
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "user_id"`)
  }
}
