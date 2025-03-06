require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const logger = require("./middleware/logger");

const app = express();

// Connect to MongoDB   
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
