-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "nickname" TEXT,
    "age" TEXT NOT NULL,
    "health_record" TEXT,
    "education_level" TEXT,
    "user_id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "adopter_id" TEXT,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Child_user_id_key" ON "Child"("user_id");

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_adopter_id_fkey" FOREIGN KEY ("adopter_id") REFERENCES "Adopter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
