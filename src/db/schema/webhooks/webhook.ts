import { integer, text, boolean, pgTable,serial,timestamp } from "drizzle-orm/pg-core";

export const todo = pgTable("webhook", {
    id : integer().primaryKey().generatedAlwaysAsIdentity(),

    // webhook fields
    discordWebhookUrl : text("discord_webhook_url"),
    slackWebhookUrl : text("slack_webhook_url"),

    discordNotificationOn : boolean("discord_notification_on").default(false),
    slackNotificationOn : boolean("slack_notification_on").default(false),
});
