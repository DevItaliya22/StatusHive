import { desc, relations, sql } from "drizzle-orm";
import { integer, text, boolean, pgTable,serial,timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../user";

export const statusPage = pgTable("statusPage", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId : integer("user_id").notNull().references(()=>users.id,{onDelete:"cascade",onUpdate:"cascade"}),

  title : text("title"),
  description : varchar("description",{length:1024}),
  subdomain : varchar("subdomain",{length:32}).unique(), // like dev.statushive.com 

  published : boolean("published").default(true),

  showMonitorStats : boolean("show_monitor_stats").default(true),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
});

export const statusRelation = relations(statusPage,({one})=>({
    user : one(users,{
      fields: [statusPage.userId],
          references: [users.id],
    })
}))