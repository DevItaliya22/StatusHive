import { relations, sql } from "drizzle-orm";
import { integer, text, boolean, pgTable,serial,timestamp } from "drizzle-orm/pg-core";
import {  subscriptionEnum } from "./constants";
import { statusPage } from "../statusPage";

export const users = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  
  // next-auth fields
  name : text("name"),
  email : text("email").unique(),
  image : text("image"),

  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),

  subscriptionType : subscriptionEnum().default("hobby"),
});

export const userRelations = relations(users,({many})=>({
  statusPages : many(statusPage)
}))

