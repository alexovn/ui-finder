/*
  Warnings:

  - You are about to drop the column `category_id` on the `Library` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Component` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Framework` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Framework` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_category_id_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Framework" ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "category_id",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_value_key" ON "Category"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Component_value_key" ON "Component"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_value_key" ON "Feature"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Framework_value_key" ON "Framework"("value");

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
