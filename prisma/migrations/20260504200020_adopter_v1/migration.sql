-- CreateTable
CREATE TABLE "Adopter" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "governmentId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "institution_id" TEXT,

    CONSTRAINT "Adopter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adopter_governmentId_key" ON "Adopter"("governmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Adopter_user_id_key" ON "Adopter"("user_id");

-- AddForeignKey
ALTER TABLE "Adopter" ADD CONSTRAINT "Adopter_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adopter" ADD CONSTRAINT "Adopter_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
