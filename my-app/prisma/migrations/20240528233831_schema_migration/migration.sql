/*
  Warnings:

  - A unique constraint covering the columns `[detail]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scale_type]` on the table `Scale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detail]` on the table `Scale` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Architect_experience_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Experience_detail_key" ON "Experience"("detail");

-- CreateIndex
CREATE UNIQUE INDEX "Scale_scale_type_key" ON "Scale"("scale_type");

-- CreateIndex
CREATE UNIQUE INDEX "Scale_detail_key" ON "Scale"("detail");
