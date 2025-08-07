import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { insertContactSchema, insertQuoteSchema, trackingRequestSchema, signUpSchema, signInSchema, getQuoteSchema, jobFilterSchema, invoiceFilterSchema, sendRequestSchema, changePasswordSchema, updateProfileSchema } from "@shared/schema";
import { z } from "zod";

// Middleware for authentication
const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  app.use(session({
    secret: process.env.SESSION_SECRET || 'logistics-session-secret-key-dev',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTtl,
    },
  }));
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Quote request submission
  app.post("/api/quote", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.json({ success: true, quote });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit quote request" });
      }
    }
  });

  // Tracking lookup
  app.post("/api/tracking", async (req, res) => {
    try {
      const { trackingNumber } = trackingRequestSchema.parse(req.body);
      const shipment = await storage.getShipmentByTrackingNumber(trackingNumber);
      
      if (!shipment) {
        res.status(404).json({ error: "Shipment not found" });
        return;
      }

      const events = await storage.getTrackingEvents(shipment.id);
      res.json({ 
        success: true, 
        shipment, 
        events: events.sort((a, b) => new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime())
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid tracking number", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to lookup tracking information" });
      }
    }
  });

  // Sign up route
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = signUpSchema.parse(req.body);
      const { recaptcha, ...userData } = validatedData;
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        res.status(400).json({ error: "User already exists with this email" });
        return;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      // Set session
      (req as any).session.user = userWithoutPassword;
      
      res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Failed to create account" });
      }
    }
  });

  // Sign in route
  app.post("/api/auth/signin", async (req, res) => {
    try {
      const validatedData = signInSchema.parse(req.body);
      const { recaptcha, ...credentials } = validatedData;
      
      // Find user
      const user = await storage.getUserByEmail(credentials.email);
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(credentials.password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      // Set session
      (req as any).session.user = userWithoutPassword;
      
      res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        console.error("Signin error:", error);
        res.status(500).json({ error: "Failed to sign in" });
      }
    }
  });

  // Sign out route
  app.post("/api/auth/signout", (req, res) => {
    (req as any).session.destroy((err: any) => {
      if (err) {
        res.status(500).json({ error: "Failed to sign out" });
        return;
      }
      res.json({ success: true });
    });
  });

  // Get current user
  app.get("/api/auth/user", (req, res) => {
    const user = (req as any).session?.user;
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  // Get quote modal submission
  app.post("/api/get-quote", async (req, res) => {
    try {
      const validatedData = getQuoteSchema.parse(req.body);
      
      // In a real app, this would save to database and/or send email
      console.log("Quote request received:", validatedData);
      
      res.json({ success: true, message: "Quote request submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        console.error("Get quote error:", error);
        res.status(500).json({ error: "Failed to submit quote request" });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }
      // In a real app, this would integrate with an email service
      res.json({ success: true, message: "Subscribed to newsletter" });
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  // Dashboard API routes (require authentication)
  
  // Get dashboard stats
  app.get("/api/dashboard/stats", isAuthenticated, async (req, res) => {
    try {
      const user = (req as any).session.user;
      const stats = await storage.getDashboardStats(user.id);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Job management routes
  app.get("/api/jobs", isAuthenticated, async (req, res) => {
    try {
      const user = (req as any).session.user;
      const filter = jobFilterSchema.parse(req.query);
      const jobs = await storage.getJobs(user.id, filter);
      res.json(jobs);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid filter parameters", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to fetch jobs" });
      }
    }
  });

  app.get("/api/jobs/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const job = await storage.getJobById(id);
      if (!job) {
        res.status(404).json({ error: "Job not found" });
        return;
      }
      
      const files = await storage.getJobFiles(id);
      res.json({ job, files });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job details" });
    }
  });

  // Bill/Invoice management routes
  app.get("/api/bills", isAuthenticated, async (req, res) => {
    try {
      const user = (req as any).session.user;
      const filter = invoiceFilterSchema.parse(req.query);
      const bills = await storage.getBills(user.id, filter);
      res.json(bills);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid filter parameters", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to fetch bills" });
      }
    }
  });

  // Request management routes
  app.post("/api/requests", isAuthenticated, async (req, res) => {
    try {
      const user = (req as any).session.user;
      const validatedData = sendRequestSchema.parse(req.body);
      const request = await storage.createRequest(user.id, validatedData);
      res.json({ success: true, request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create request" });
      }
    }
  });

  app.get("/api/requests", isAuthenticated, async (req, res) => {
    try {
      const user = (req as any).session.user;
      const requests = await storage.getRequests(user.id);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch requests" });
    }
  });

  // Profile management routes
  app.put("/api/profile", isAuthenticated, async (req, res) => {
    try {
      const user = (req as any).session.user;
      const validatedData = updateProfileSchema.parse(req.body);
      const updatedUser = await storage.updateUserProfile(user.id, validatedData);
      
      // Update session
      const { password, ...userWithoutPassword } = updatedUser;
      (req as any).session.user = userWithoutPassword;
      
      res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update profile" });
      }
    }
  });

  // Change password route
  app.post("/api/auth/change-password", isAuthenticated, async (req, res) => {
    try {
      const user = (req as any).session.user;
      const validatedData = changePasswordSchema.parse(req.body);
      
      // Get current user with password
      const currentUser = await storage.getUser(user.id);
      if (!currentUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      
      // Verify current password
      const isValidPassword = await bcrypt.compare(validatedData.currentPassword, currentUser.password);
      if (!isValidPassword) {
        res.status(400).json({ error: "Current password is incorrect" });
        return;
      }
      
      // Hash new password and update
      const hashedPassword = await bcrypt.hash(validatedData.newPassword, 12);
      await storage.updateUserPassword(user.id, hashedPassword);
      
      res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to change password" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
