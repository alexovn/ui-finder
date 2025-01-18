/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Library` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Component_name_key";

-- DropIndex
DROP INDEX "Feature_name_key";

-- DropIndex
DROP INDEX "Framework_name_key";

-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "value" TEXT NOT NULL,
ALTER COLUMN "link" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Library_value_key" ON "Library"("value");
