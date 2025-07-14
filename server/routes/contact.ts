import { Request, Response } from "express";

// In-memory storage for contact form submissions
let contactSubmissions: Array<{
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedDate: string;
  status: string;
  priority: string;
  replies?: Array<{
    id: number;
    message: string;
    date: string;
  }>;
}> = [];

let nextContactId = 1;
let nextReplyId = 1;

export const handleContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    const newContact = {
      id: nextContactId++,
      name,
      email,
      subject,
      message,
      submittedDate: new Date().toLocaleString(),
      status: "New",
      priority: "Medium",
      replies: [],
    };

    contactSubmissions.push(newContact);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Error handling contact:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getContactSubmissions = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: contactSubmissions,
    });
  } catch (error) {
    console.error("Error getting contact submissions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = contactSubmissions.find(c => c.id === parseInt(id));
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    contact.status = status;

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addContactReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Reply message is required",
      });
    }

    const contact = contactSubmissions.find(c => c.id === parseInt(id));
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    const reply = {
      id: nextReplyId++,
      message,
      date: new Date().toLocaleString(),
    };

    contact.replies = contact.replies || [];
    contact.replies.push(reply);
    contact.status = "Replied";

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error adding contact reply:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}; 