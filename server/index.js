import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

app.use(express.json());
app.use(cors());

app.post("/create-customer", async (req, res) => {
  const { email, name } = req.body;

  // TODO: Stripe does not verify if the customer exists, it just creates another customer,
  // to prevent this, we have to manage this on our own by storing email and customer_id in our database.
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    if (!customer.id) {
      return res
        .status(400)
        .send({ success: false, message: "Failed to create a customer" });
    }

    res.status(200).send({ ...customer });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen("8080", () => {
  console.log("Server running at http://localhost:8080");
});
