/*
  Warnings:

  - You are about to drop the column `githubLink` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `npmLink` on the `Library` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Library" DROP COLUMN "githubLink",
DROP COLUMN "npmLink",
ADD COLUMN     "githubRepo" TEXT,
ADD COLUMN     "githubStars" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "npmDownloads" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "npmPackage" TEXT;
