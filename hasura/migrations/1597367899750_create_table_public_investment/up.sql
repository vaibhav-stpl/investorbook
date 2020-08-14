CREATE TABLE "public"."investment"("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "amount" numeric, "investor_id" integer NOT NULL, "company_id" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("investor_id") REFERENCES "public"."investor"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_investment_updated_at"
BEFORE UPDATE ON "public"."investment"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_investment_updated_at" ON "public"."investment" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
