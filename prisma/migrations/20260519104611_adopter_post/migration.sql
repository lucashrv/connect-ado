-- CreateTable
CREATE TABLE "AdopterPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "photo_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "adopter_id" TEXT NOT NULL,

    CONSTRAINT "AdopterPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdopterPost" ADD CONSTRAINT "AdopterPost_adopter_id_fkey" FOREIGN KEY ("adopter_id") REFERENCES "Adopter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
