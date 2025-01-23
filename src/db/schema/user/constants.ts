import { pgEnum } from "drizzle-orm/pg-core";

export const subscriptionEnum = pgEnum("subscriptionType", ["hobby", "pro"]);