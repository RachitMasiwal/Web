import { type User, type InsertUser, type Contact, type InsertContact, type Quote, type InsertQuote, type Shipment, type TrackingEvent, type Job, type InsertJob, type JobFile, type Bill, type InsertBill, type Request, type SendRequest, type JobFilter, type InvoiceFilter, type UpdateProfile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: string, profile: UpdateProfile): Promise<User>;
  updateUserPassword(userId: string, newPassword: string): Promise<void>;
  
  // Contact and quote management
  createContact(contact: InsertContact): Promise<Contact>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  
  // Shipment tracking
  getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | undefined>;
  getTrackingEvents(shipmentId: string): Promise<TrackingEvent[]>;
  
  // Job management
  createJob(job: InsertJob): Promise<Job>;
  getJobs(userId: string, filter?: JobFilter): Promise<Job[]>;
  getJobById(jobId: string): Promise<Job | undefined>;
  getJobFiles(jobId: string): Promise<JobFile[]>;
  
  // Bill management
  createBill(bill: InsertBill): Promise<Bill>;
  getBills(userId: string, filter?: InvoiceFilter): Promise<Bill[]>;
  
  // Request management
  createRequest(userId: string, request: SendRequest): Promise<Request>;
  getRequests(userId: string): Promise<Request[]>;
  
  // Dashboard stats
  getDashboardStats(userId: string): Promise<{
    totalJobs: number;
    pendingRequests: number;
    completedJobs: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private quotes: Map<string, Quote>;
  private shipments: Map<string, Shipment>;
  private trackingEvents: Map<string, TrackingEvent[]>;
  private jobs: Map<string, Job>;
  private jobFiles: Map<string, JobFile[]>;
  private bills: Map<string, Bill>;
  private requests: Map<string, Request>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.quotes = new Map();
    this.shipments = new Map();
    this.trackingEvents = new Map();
    this.jobs = new Map();
    this.jobFiles = new Map();
    this.bills = new Map();
    this.requests = new Map();
    
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample shipments for demonstration
    const sampleShipments: Shipment[] = [
      {
        id: "1",
        trackingNumber: "ULX123456789",
        serviceType: "Air Freight",
        status: "Out for Delivery",
        origin: "New York, USA",
        destination: "London, UK",
        estimatedDelivery: new Date("2024-12-17"),
        createdAt: new Date("2024-12-15"),
        updatedAt: new Date("2024-12-16"),
      },
      {
        id: "2",
        trackingNumber: "ULX987654321",
        serviceType: "Ocean Freight",
        status: "In Transit",
        origin: "Shanghai, China",
        destination: "Los Angeles, USA",
        estimatedDelivery: new Date("2024-12-25"),
        createdAt: new Date("2024-12-10"),
        updatedAt: new Date("2024-12-15"),
      }
    ];

    sampleShipments.forEach(shipment => {
      this.shipments.set(shipment.trackingNumber, shipment);
    });

    // Sample tracking events
    this.trackingEvents.set("1", [
      {
        id: "e1",
        shipmentId: "1",
        status: "Package Collected",
        location: "New York, USA",
        description: "Your shipment has been collected from the origin",
        timestamp: new Date("2024-12-15T09:30:00"),
      },
      {
        id: "e2",
        shipmentId: "1",
        status: "In Transit",
        location: "JFK Airport, New York",
        description: "Package is on route to destination hub",
        timestamp: new Date("2024-12-16T14:15:00"),
      },
      {
        id: "e3",
        shipmentId: "1",
        status: "Arrived at Hub",
        location: "Heathrow Airport, London",
        description: "Package has arrived at destination hub",
        timestamp: new Date("2024-12-16T22:45:00"),
      },
      {
        id: "e4",
        shipmentId: "1",
        status: "Out for Delivery",
        location: "London, UK",
        description: "Package will be delivered today",
        timestamp: new Date("2024-12-17T08:00:00"),
      }
    ]);

    this.trackingEvents.set("2", [
      {
        id: "e5",
        shipmentId: "2",
        status: "Package Collected",
        location: "Shanghai, China",
        description: "Container loaded and shipped",
        timestamp: new Date("2024-12-10T10:00:00"),
      },
      {
        id: "e6",
        shipmentId: "2",
        status: "In Transit",
        location: "Pacific Ocean",
        description: "Vessel en route to destination port",
        timestamp: new Date("2024-12-15T12:00:00"),
      }
    ]);

    // Create sample user for demo
    const sampleUser: User = {
      id: "demo-user-id",
      email: "demo@unitaslogistix.com",
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // "password"
      firstName: "John",
      companyName: "Demo Logistics Co.",
      phoneNumber: "+1-555-0123",
      einBusinessNumber: "12-3456789",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    };
    this.users.set(sampleUser.id, sampleUser);

    // Sample jobs data
    const sampleJobs: Job[] = [
      {
        id: "job-1",
        userId: "demo-user-id",
        jobNo: "0173-ONS-AE-LDH-25-26",
        clientInvoiceNo: "INV-2024-001",
        jobDate: new Date("2024-07-31"),
        invoiceDate: new Date("2024-08-12"),
        destination: "BIRMINGHAM",
        mbl: "008-43878472",
        mblDate: new Date("2024-07-30"),
        pkg: 311,
        status: "completed",
        createdAt: new Date("2024-07-31"),
        updatedAt: new Date("2024-08-12"),
      },
      {
        id: "job-2",
        userId: "demo-user-id",
        jobNo: "0174-ONS-AE-NYC-25-27",
        clientInvoiceNo: "INV-2024-002",
        jobDate: new Date("2024-08-05"),
        invoiceDate: new Date("2024-08-15"),
        destination: "NEW YORK",
        mbl: "009-43878473",
        mblDate: new Date("2024-08-04"),
        pkg: 225,
        status: "in-transit",
        createdAt: new Date("2024-08-05"),
        updatedAt: new Date("2024-08-15"),
      },
      {
        id: "job-3",
        userId: "demo-user-id",
        jobNo: "0175-ONS-AE-LAX-25-28",
        clientInvoiceNo: "INV-2024-003",
        jobDate: new Date("2024-08-10"),
        invoiceDate: null,
        destination: "LOS ANGELES",
        mbl: "010-43878474",
        mblDate: new Date("2024-08-09"),
        pkg: 445,
        status: "pending",
        createdAt: new Date("2024-08-10"),
        updatedAt: new Date("2024-08-10"),
      }
    ];

    sampleJobs.forEach(job => {
      this.jobs.set(job.id, job);
    });

    // Sample job files
    this.jobFiles.set("job-1", [
      {
        id: "file-1",
        jobId: "job-1",
        fileName: "RADI050AE2526",
        fileType: "PDF",
        fileUrl: null,
        createdAt: new Date("2024-08-04"),
      },
      {
        id: "file-2",
        jobId: "job-1",
        fileName: "ONS/AE/0207/2526",
        fileType: "Excel",
        fileUrl: null,
        createdAt: new Date("2024-08-04"),
      }
    ]);

    // Sample bills
    const sampleBills: Bill[] = [
      {
        id: "bill-1",
        userId: "demo-user-id",
        jobId: "job-1",
        billNo: "RADI050AE/2526",
        billDate: new Date("2024-08-04"),
        amount: "6227.00",
        status: "paid",
        createdAt: new Date("2024-08-04"),
      },
      {
        id: "bill-2",
        userId: "demo-user-id",
        jobId: "job-2",
        billNo: "ONS/AE/0207/2526",
        billDate: new Date("2024-08-04"),
        amount: "747179.07",
        status: "pending",
        createdAt: new Date("2024-08-04"),
      },
      {
        id: "bill-3",
        userId: "demo-user-id",
        jobId: "job-3",
        billNo: "ONS/ES/01902/526",
        billDate: new Date("2024-07-26"),
        amount: "203978.00",
        status: "overdue",
        createdAt: new Date("2024-07-26"),
      },
      {
        id: "bill-4",
        userId: "demo-user-id",
        jobId: null,
        billNo: "ONS/AE/01742/526",
        billDate: new Date("2024-07-16"),
        amount: "428685.66",
        status: "paid",
        createdAt: new Date("2024-07-16"),
      }
    ];

    sampleBills.forEach(bill => {
      this.bills.set(bill.id, bill);
    });

    // Sample requests
    const sampleRequests: Request[] = [
      {
        id: "req-1",
        userId: "demo-user-id",
        subject: "Document Update Request",
        description: "Please update the shipping documents for job #0173-ONS-AE-LDH-25-26",
        attachmentUrl: null,
        status: "pending",
        createdAt: new Date("2024-08-01"),
        updatedAt: new Date("2024-08-01"),
      },
      {
        id: "req-2",
        userId: "demo-user-id",
        subject: "Delivery Schedule Change",
        description: "Request to change delivery date for urgent shipment",
        attachmentUrl: null,
        status: "completed",
        createdAt: new Date("2024-07-28"),
        updatedAt: new Date("2024-07-30"),
      }
    ];

    sampleRequests.forEach(request => {
      this.requests.set(request.id, request);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      phone: insertContact.phone || null,
      serviceType: insertContact.serviceType || null,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = { 
      ...insertQuote, 
      id,
      phone: insertQuote.phone || null,
      weight: insertQuote.weight || null,
      dimensions: insertQuote.dimensions || null,
      requirements: insertQuote.requirements || null,
      createdAt: new Date()
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | undefined> {
    return this.shipments.get(trackingNumber);
  }

  async getTrackingEvents(shipmentId: string): Promise<TrackingEvent[]> {
    return this.trackingEvents.get(shipmentId) || [];
  }

  // User management methods
  async updateUserProfile(userId: string, profile: UpdateProfile): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, ...profile, updatedAt: new Date() };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateUserPassword(userId: string, newPassword: string): Promise<void> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, password: newPassword, updatedAt: new Date() };
    this.users.set(userId, updatedUser);
  }

  // Job management methods
  async createJob(job: InsertJob): Promise<Job> {
    const id = randomUUID();
    const newJob: Job = {
      ...job,
      id,
      clientInvoiceNo: job.clientInvoiceNo || null,
      invoiceDate: job.invoiceDate || null,
      mbl: job.mbl || null,
      mblDate: job.mblDate || null,
      pkg: job.pkg || null,
      status: job.status || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.jobs.set(id, newJob);
    return newJob;
  }

  async getJobs(userId: string, filter?: JobFilter): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values()).filter(job => job.userId === userId);
    
    if (filter) {
      if (filter.clientInvoiceNo) {
        jobs = jobs.filter(job => 
          job.clientInvoiceNo?.toLowerCase().includes(filter.clientInvoiceNo!.toLowerCase())
        );
      }
      if (filter.fromDate) {
        const fromDate = new Date(filter.fromDate);
        jobs = jobs.filter(job => job.jobDate >= fromDate);
      }
      if (filter.toDate) {
        const toDate = new Date(filter.toDate);
        jobs = jobs.filter(job => job.jobDate <= toDate);
      }
    }
    
    return jobs.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getJobById(jobId: string): Promise<Job | undefined> {
    return this.jobs.get(jobId);
  }

  async getJobFiles(jobId: string): Promise<JobFile[]> {
    return this.jobFiles.get(jobId) || [];
  }

  // Bill management methods
  async createBill(bill: InsertBill): Promise<Bill> {
    const id = randomUUID();
    const newBill: Bill = {
      ...bill,
      id,
      jobId: bill.jobId || null,
      status: bill.status || "pending",
      createdAt: new Date(),
    };
    this.bills.set(id, newBill);
    return newBill;
  }

  async getBills(userId: string, filter?: InvoiceFilter): Promise<Bill[]> {
    let bills = Array.from(this.bills.values()).filter(bill => bill.userId === userId);
    
    if (filter) {
      if (filter.clientInvoiceNo) {
        bills = bills.filter(bill => {
          // Filter by bill number containing the client invoice search
          return bill.billNo.toLowerCase().includes(filter.clientInvoiceNo!.toLowerCase());
        });
      }
      if (filter.fromDate) {
        const fromDate = new Date(filter.fromDate);
        bills = bills.filter(bill => bill.billDate >= fromDate);
      }
      if (filter.toDate) {
        const toDate = new Date(filter.toDate);
        bills = bills.filter(bill => bill.billDate <= toDate);
      }
    }
    
    return bills.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  // Request management methods
  async createRequest(userId: string, request: SendRequest): Promise<Request> {
    const id = randomUUID();
    const newRequest: Request = {
      ...request,
      id,
      userId,
      attachmentUrl: request.attachmentUrl || null,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.requests.set(id, newRequest);
    return newRequest;
  }

  async getRequests(userId: string): Promise<Request[]> {
    return Array.from(this.requests.values())
      .filter(request => request.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  // Dashboard stats
  async getDashboardStats(userId: string): Promise<{
    totalJobs: number;
    pendingRequests: number;
    completedJobs: number;
  }> {
    const userJobs = Array.from(this.jobs.values()).filter(job => job.userId === userId);
    const userRequests = Array.from(this.requests.values()).filter(req => req.userId === userId);
    
    return {
      totalJobs: userJobs.length,
      pendingRequests: userRequests.filter(req => req.status === "pending").length,
      completedJobs: userJobs.filter(job => job.status === "completed").length,
    };
  }
}

export const storage = new MemStorage();
