-- CreateTable
CREATE TABLE "ArchitectStats" (
    "architect_id" INTEGER NOT NULL,
    "view_count" INTEGER NOT NULL,
    "contact_count" INTEGER NOT NULL,

    CONSTRAINT "ArchitectStats_pkey" PRIMARY KEY ("architect_id")
);

-- AddForeignKey
ALTER TABLE "ArchitectStats" ADD CONSTRAINT "ArchitectStats_architect_id_fkey" FOREIGN KEY ("architect_id") REFERENCES "Architect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
