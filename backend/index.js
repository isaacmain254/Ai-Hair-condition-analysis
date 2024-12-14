import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
import multer from "multer";
// import HairConditionAnalyzer from "./analyze.js";

dotenv.config();

const app = express();
const PORT = 5000;

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL;
// Middleware
app.use(cors());
app.use(express.json());
app.post("/", (req, res) => {
  res.send("Hello from Express!");
});
// Stripe Payment Route
app.post("/create-checkout-session", async (req, res) => {
  const { planId, planAmount, planCurrency } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: planCurrency || "usd",
            product_data: {
              name: planId,
            },
            unit_amount: planAmount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// const hairAnalyzer = new HairConditionAnalyzer();
// const upload = multer({ dest: "uploads/" });
// // Image upload and analysis route
// app.post("/api/analyze-hair", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }

//     const analysis = await hairAnalyzer.analyzeHairCondition(req.file.path);

//     // Clean up uploaded file
//     fs.unlinkSync(req.file.path);

//     res.json(analysis);
//   } catch (error) {
//     console.error("Analysis error:", error);
//     res.status(500).json({ error: "Analysis failed" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
