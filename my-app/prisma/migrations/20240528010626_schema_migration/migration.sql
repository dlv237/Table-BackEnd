-- CreateTable
CREATE TABLE "Architect" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT,
    "website" TEXT,
    "social_media" TEXT,
    "experience_id" INTEGER NOT NULL,

    CONSTRAINT "Architect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scale" (
    "id" SERIAL NOT NULL,
    "scale_type" TEXT NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "Scale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchitectScales" (
    "architect_id" INTEGER NOT NULL,
    "scale_id" INTEGER NOT NULL,

    CONSTRAINT "ArchitectScales_pkey" PRIMARY KEY ("architect_id","scale_id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "architect_id" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Architect_email_key" ON "Architect"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Architect_phone_key" ON "Architect"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Architect_name_key" ON "Architect"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Architect_experience_id_key" ON "Architect"("experience_id");

-- AddForeignKey
ALTER TABLE "Architect" ADD CONSTRAINT "Architect_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectScales" ADD CONSTRAINT "ArchitectScales_architect_id_fkey" FOREIGN KEY ("architect_id") REFERENCES "Architect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectScales" ADD CONSTRAINT "ArchitectScales_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "Scale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_architect_id_fkey" FOREIGN KEY ("architect_id") REFERENCES "Architect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
