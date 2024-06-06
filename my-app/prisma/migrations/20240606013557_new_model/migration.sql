/*
  Warnings:

  - You are about to drop the column `social_media` on the `Architect` table. All the data in the column will be lost.
  - You are about to drop the column `social_type` on the `Architect` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Architect" DROP COLUMN "social_media",
DROP COLUMN "social_type";

-- CreateTable
CREATE TABLE "ArchitectNetworks" (
    "id" SERIAL NOT NULL,
    "architect_id" INTEGER NOT NULL,
    "social_type" TEXT NOT NULL,
    "social_media" TEXT NOT NULL,

    CONSTRAINT "ArchitectNetworks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArchitectNetworks" ADD CONSTRAINT "ArchitectNetworks_architect_id_fkey" FOREIGN KEY ("architect_id") REFERENCES "Architect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
