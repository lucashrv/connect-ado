-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INSTITUTION', 'ADOPTER', 'CHILD');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Adopter" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "institution_id" TEXT,

    CONSTRAINT "Adopter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "nickname" TEXT,
    "birth_date" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "health_record" TEXT,
    "education_level" TEXT,
    "user_id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "adopter_id" TEXT,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildPersonalManual" (
    "id" TEXT NOT NULL,
    "daily_routine" TEXT,
    "favorite_food" TEXT,
    "favorite_music" TEXT,
    "favorite_activity" TEXT,
    "hobbies" TEXT,
    "study_habits" TEXT,
    "fears" TEXT,
    "notes" TEXT,
    "child_id" TEXT NOT NULL,

    CONSTRAINT "ChildPersonalManual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_cnpj_key" ON "Institution"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_phone_key" ON "Institution"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_user_id_key" ON "Institution"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Adopter_cpf_key" ON "Adopter"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Adopter_user_id_key" ON "Adopter"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Child_user_id_key" ON "Child"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChildPersonalManual_child_id_key" ON "ChildPersonalManual"("child_id");

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adopter" ADD CONSTRAINT "Adopter_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adopter" ADD CONSTRAINT "Adopter_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_adopter_id_fkey" FOREIGN KEY ("adopter_id") REFERENCES "Adopter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildPersonalManual" ADD CONSTRAINT "ChildPersonalManual_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
