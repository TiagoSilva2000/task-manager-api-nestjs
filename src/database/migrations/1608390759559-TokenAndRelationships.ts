import { MigrationInterface, QueryRunner } from 'typeorm'

export class TokenAndRelationships1608390759559 implements MigrationInterface {
  name = 'TokenAndRelationships1608390759559'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "token" character varying(255) NOT NULL, "token_type" character varying(30) NOT NULL DEFAULT 'jwt', "is_revoked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "user_id" integer, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."created_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "created_at" SET DEFAULT 'now()'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."updated_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
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
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
    )
    await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "updated_at" SET DEFAULT '2020-12-17 22:47:05.758006'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."updated_at" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "created_at" SET DEFAULT '2020-12-17 22:47:05.758006'`
    )
    await queryRunner.query(`COMMENT ON COLUMN "task"."created_at" IS NULL`)
    await queryRunner.query(`DROP TABLE "token"`)
  }
}
