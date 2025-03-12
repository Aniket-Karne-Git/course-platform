import { relations } from "drizzle-orm";
import { integer, pgTable, text, pgEnum } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";

export const productStatuses = ["public", "private"] as const;
export type productStatus = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum("product_status", productStatuses);

export const ProductTable = pgTable("products", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollers: integer().notNull(),
  status: productStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
}));
