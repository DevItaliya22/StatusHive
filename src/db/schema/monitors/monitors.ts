import { desc, relations, sql } from "drizzle-orm";
import { integer, text, boolean, pgTable,serial,timestamp, varchar, interval } from "drizzle-orm/pg-core";
import { statusPage } from "../statusPage";
import { monitor_methods_enum as METHOD_ENUM } from "./constants";

export const monitors = pgTable("monitors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  statusPageId : integer("status_page_id").notNull().references(()=>statusPage.id,{onDelete:"cascade",onUpdate:"cascade"}),

  showMonitorStats : boolean("show_monitor_stats").default(true),
  active : boolean("active").default(true),
  url : varchar("url",{length:1024}),
  method : METHOD_ENUM().default("GET"),
  public : boolean("public").default(true),
  ttl : integer("ttl").default(5000), // in ms

    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at")
});


export const monitorRelations = relations(monitors,({one})=>({
    statusPage : one(statusPage,{
      fields: [monitors.statusPageId],
          references: [statusPage.id],
    })
}))