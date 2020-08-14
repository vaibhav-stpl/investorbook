DROP TRIGGER IF EXISTS "set_public_company_updated_at" ON "public"."company";
ALTER TABLE "public"."company" DROP COLUMN "updated_at";
