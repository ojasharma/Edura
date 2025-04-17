// src/routes/clerkWebhook.ts
import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/clerk-webhook", async (req, res) => {
  const { type, data } = req.body;

  if (type === "user.created") {
    try {
      const { email_addresses, first_name, last_name, phone_numbers } = data;

      const email = email_addresses?.[0]?.email_address || "";
      const number = phone_numbers?.[0]?.phone_number || "";

      const newUser = new User({
        name: `${first_name} ${last_name}`,
        email,
        number,
      });

      await newUser.save();
      return res.status(201).send("User saved from Clerk webhook.");
    } catch (error) {
      console.error("Error saving user from webhook:", error);
      return res.status(500).send("Error processing Clerk webhook.");
    }
  }

  res.status(200).send("Webhook received.");
});

export default router;
