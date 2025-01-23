CREATE TYPE "public"."monitor_methods_enum" AS ENUM('GET', 'POST');--> statement-breakpoint
CREATE TABLE "monitors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "monitors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"status_page_id" integer NOT NULL,
	"show_monitor_stats" boolean DEFAULT true,
	"active" boolean DEFAULT true,
	"url" varchar(1024),
	"method" "monitor_methods_enum" DEFAULT 'GET',
	"public" boolean DEFAULT true,
	"ttl" integer DEFAULT 5000,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_status_page_id_statusPage_id_fk" FOREIGN KEY ("status_page_id") REFERENCES "public"."statusPage"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "statusPage" DROP COLUMN "show_monitor_stats";