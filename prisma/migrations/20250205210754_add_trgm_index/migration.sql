-- CreateIndex
CREATE INDEX "library_name_trgm" ON "Library" USING gin ("name" gin_trgm_ops);
