-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "legal_representative_name" TEXT NOT NULL,
    "foundation_date" DATE NOT NULL,
    "license_number" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Institution_cnpj_key" ON "Institution"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_phone_key" ON "Institution"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_user_id_key" ON "Institution"("user_id");

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
