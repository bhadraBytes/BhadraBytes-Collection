import { db } from "../lib/firebase/db"; // Import your Firebase database module
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // ... (existing code)

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      // Save order details to Firebase
      const order = {
        userId: "user123", // Replace with actual user ID
        items: req.body.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: session.amount_total / 100,
        shippingAddress: req.body.shipping_address, // Modify to get the actual shipping address
        timestamp: new Date(),
      };

      await db.collection("orders").add(order);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
