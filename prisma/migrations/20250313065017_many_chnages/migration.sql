-- AlterTable
ALTER TABLE "Monitor" ADD COLUMN     "name" TEXT,
ADD COLUMN     "statusPageId" INTEGER;

-- CreateTable
CREATE TABLE "TestedEmail" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestedEmail_email_key" ON "TestedEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TestedEmail_email_userId_key" ON "TestedEmail"("email", "userId");

-- AddForeignKey
ALTER TABLE "TestedEmail" ADD CONSTRAINT "TestedEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_statusPageId_fkey" FOREIGN KEY ("statusPageId") REFERENCES "StatusPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
