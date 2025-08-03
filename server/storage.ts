import { type User, type InsertUser, type Contact, type InsertContact, type Quote, type InsertQuote, type Shipment, type TrackingEvent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | undefined>;
  getTrackingEvents(shipmentId: string): Promise<TrackingEvent[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private quotes: Map<string, Quote>;
  private shipments: Map<string, Shipment>;
  private trackingEvents: Map<string, TrackingEvent[]>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.quotes = new Map();
    this.shipments = new Map();
    this.trackingEvents = new Map();
    
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
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
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
}

export const storage = new MemStorage();
