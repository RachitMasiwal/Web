import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  companyName: text("company_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  einBusinessNumber: text("ein_business_number").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceType: text("service_type"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceType: text("service_type").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  weight: integer("weight"),
  dimensions: text("dimensions"),
  requirements: text("requirements"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shipments = pgTable("shipments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trackingNumber: text("tracking_number").notNull().unique(),
  serviceType: text("service_type").notNull(),
  status: text("status").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  estimatedDelivery: timestamp("estimated_delivery"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const trackingEvents = pgTable("tracking_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  shipmentId: varchar("shipment_id").references(() => shipments.id),
  status: text("status").notNull(),
  location: text("location"),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Authentication schemas
export const signUpSchema = createInsertSchema(users)
  .pick({
    firstName: true,
    companyName: true,
    phoneNumber: true,
    einBusinessNumber: true,
    email: true,
    password: true,
  })
  .extend({
    password: z.string().min(8, "Password must be at least 8 characters"),
    email: z.string().email("Invalid email format"),
    recaptcha: z.string().min(1, "Please complete the reCAPTCHA"),
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA"),
});

export const getQuoteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email format"),
  companyName: z.string().min(1, "Company name is required"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  firstName: true,
  companyName: true,
  phoneNumber: true,
  einBusinessNumber: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  serviceType: true,
  message: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).pick({
  name: true,
  email: true,
  phone: true,
  serviceType: true,
  origin: true,
  destination: true,
  weight: true,
  dimensions: true,
  requirements: true,
});

export const trackingRequestSchema = z.object({
  trackingNumber: z.string().min(1, "Tracking number is required"),
  serviceType: z.string().optional(),
});

export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type GetQuote = z.infer<typeof getQuoteSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;
export type Shipment = typeof shipments.$inferSelect;
export type TrackingEvent = typeof trackingEvents.$inferSelect;
export type TrackingRequest = z.infer<typeof trackingRequestSchema>;
