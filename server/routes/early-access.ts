import { Request, Response } from "express";

// In-memory storage for early access signups
let earlyAccessSignups: Array<{
  id: number;
  name: string;
  email: string;
  signupDate: string;
  status: string;
  source: string;
}> = [];

let nextId = 1;

export const handleEarlyAccess = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: "Name and email are required" 
      });
    }

    const newSignup = {
      id: nextId++,
      name,
      email,
      signupDate: new Date().toLocaleString(),
      status: "New",
      source: "Landing Page",
    };

    earlyAccessSignups.push(newSignup);

    res.status(201).json({
      success: true,
      message: "Successfully joined early access",
      data: newSignup,
    });
  } catch (error) {
    console.error("Error handling early access:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getEarlyAccessSignups = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: earlyAccessSignups,
    });
  } catch (error) {
    console.error("Error getting early access signups:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateEarlyAccessStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const signup = earlyAccessSignups.find(s => s.id === parseInt(id));
    if (!signup) {
      return res.status(404).json({
        success: false,
        message: "Signup not found",
      });
    }

    signup.status = status;

    res.status(200).json({
      success: true,
      data: signup,
    });
  } catch (error) {
    console.error("Error updating early access status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}; 