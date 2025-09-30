import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";




import booksRoute from "./routes/booksRoute.js";  // your routes

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/books", booksRoute);
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5555, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5555}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

