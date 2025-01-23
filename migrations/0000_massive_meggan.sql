CREATE TYPE "public"."subscriptionType" AS ENUM('hobby', 'pro');--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text,
	"email" text,
	"image" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	"subscriptionType" "subscriptionType" DEFAULT 'hobby',
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "statusPage" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "statusPage_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"title" text,
	"description" varchar(1024),
	"subdomain" varchar(32),
	"published" boolean DEFAULT true,
	"show_monitor_stats" boolean DEFAULT true,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "statusPage_subdomain_unique" UNIQUE("subdomain")
);
--> statement-breakpoint
CREATE TABLE "webhook" (
	"id" integer PRIMARY KEY NOT NULL,
	"discord_webhook_url" text,
	"slack_webhook_url" text,
	"discord_notification_on" boolean DEFAULT false,
	"slack_notification_on" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "statusPage" ADD CONSTRAINT "statusPage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;