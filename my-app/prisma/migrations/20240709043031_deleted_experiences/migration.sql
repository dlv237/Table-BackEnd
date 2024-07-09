/*
  Warnings:

  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Architect" DROP CONSTRAINT "Architect_experience_id_fkey";

-- DropTable
DROP TABLE "Experience";
