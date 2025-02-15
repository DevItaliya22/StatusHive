-- CreateEnum
CREATE TYPE "MonitorMethodsEnum" AS ENUM ('GET', 'POST');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('hobby', 'pro');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "subscriptionType" "SubscriptionType" NOT NULL DEFAULT 'hobby',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusPage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT,
    "description" VARCHAR(1024),
    "subdomain" TEXT,
    "customDomain" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "StatusPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monitor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "showMonitorStats" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "url" VARCHAR(1024),
    "method" "MonitorMethodsEnum" NOT NULL DEFAULT 'GET',
    "public" BOOLEAN NOT NULL DEFAULT true,
    "ttl" INTEGER NOT NULL DEFAULT 5000,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "discordWebhook" TEXT,
    "slackWebhook" TEXT,
    "emailNotification" TEXT,
    "emailNotificationOn" BOOLEAN NOT NULL DEFAULT false,
    "discordNotificationOn" BOOLEAN NOT NULL DEFAULT false,
    "slackNotificationOn" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StatusPage_subdomain_key" ON "StatusPage"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "StatusPage_customDomain_key" ON "StatusPage"("customDomain");

-- CreateIndex
CREATE INDEX "statusPage_subdomain_idx" ON "StatusPage"("subdomain");

-- CreateIndex
CREATE INDEX "statusPage_custom_domain_idx" ON "StatusPage"("customDomain");

-- CreateIndex
CREATE UNIQUE INDEX "StatusPage_subdomain_customDomain_key" ON "StatusPage"("subdomain", "customDomain");

-- AddForeignKey
ALTER TABLE "StatusPage" ADD CONSTRAINT "StatusPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
