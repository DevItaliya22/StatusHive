import { pgEnum } from "drizzle-orm/pg-core";

export const monitor_methods_enum = pgEnum("monitor_methods_enum",["GET","POST"]);