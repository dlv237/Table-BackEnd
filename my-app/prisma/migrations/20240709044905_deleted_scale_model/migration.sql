/*
  Warnings:

  - You are about to drop the `Scale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArchitectScales" DROP CONSTRAINT "ArchitectScales_scale_id_fkey";

-- DropTable
DROP TABLE "Scale";
