-- DropIndex
DROP INDEX "library_name_trgm";

-- CreateIndex
CREATE INDEX "library_name_trgm" ON "Library"("name");
