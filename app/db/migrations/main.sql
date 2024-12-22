CREATE TABLE IF NOT EXISTS "sources" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
);

CREATE TABLE IF NOT EXISTS "categories" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
);

CREATE TABLE IF NOT EXISTS "operations" (
    "id" serial PRIMARY KEY NOT NULL,
    "type" text NOT NULL,
    "name" text,
    "amount" decimal(15,2) NOT NULL,
    "operationDate" date NOT NULL,
    "sourceId" integer REFERENCES "sources"("id"),
    "categoryId" integer REFERENCES "categories"("id"),
);

-- Add indices for foreign keys to improve query performance
CREATE INDEX IF NOT EXISTS "operations_source_id_index" ON "operations" ("source_id");
CREATE INDEX IF NOT EXISTS "operations_category_id_index" ON "operations" ("category_id");
CREATE INDEX IF NOT EXISTS "operations_date_idx" ON "operations" ("operationDate");
