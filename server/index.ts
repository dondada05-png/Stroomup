import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleEarlyAccess, getEarlyAccessSignups, updateEarlyAccessStatus } from "./routes/early-access";
import { handleContact, getContactSubmissions, updateContactStatus, addContactReply } from "./routes/contact";

export function createServer() {
  const app = express();

  // Middleware with CORS configuration
  app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3000", "http://localhost:3001", "http://localhost:3003"],
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Early Access routes
  app.post("/api/early-access", handleEarlyAccess);
  app.get("/api/early-access", getEarlyAccessSignups);
  app.put("/api/early-access/:id/status", updateEarlyAccessStatus);

  // Contact routes
  app.post("/api/contact", handleContact);
  app.get("/api/contact", getContactSubmissions);
  app.put("/api/contact/:id/status", updateContactStatus);
  app.post("/api/contact/:id/reply", addContactReply);

  return app;
}
