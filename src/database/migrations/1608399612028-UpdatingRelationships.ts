import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatingRelationships1608399612028 implements MigrationInterface {
  name = 'UpdatingRelationships1608399612028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."created_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "created_at" SET DEFAULT 'now()'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."updated_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`
    )
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "user_id" SET NOT NULL`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."user_id" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`
    )
    await queryRunner.query(
      `ALTER TABLE "token" ALTER COLUMN "user_id" SET NOT NULL`
    )
    await queryRunner.query(`COMMENT ON COLUMN "token"."user_id" IS NULL`)
    await queryRunner.query(`COMMENT ON COLUMN "token"."created_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "token" ALTER COLUMN "created_at" SET DEFAULT 'now()'`
    )
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`
    )
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`
    )
    await queryRunner.query(
      `ALTER TABLE "token" ALTER COLUMN "created_at" SET DEFAULT '2020-12-19 15:13:11.351546'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "token"."created_at" IS NULL`)
    await queryRunner.query(`COMMENT ON COLUMN "token"."user_id" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "token" ALTER COLUMN "user_id" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."user_id" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "user_id" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "updated_at" SET DEFAULT '2020-12-19 15:13:11.351546'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."updated_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "created_at" SET DEFAULT '2020-12-19 15:13:11.351546'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."created_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }
}
