
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as nftRoutes } from "./src/routes/nftRoutes.js";
import ipfsRoutes from "./src/routes/ipfsRoutes.js";
import userIpfsRoutes from "./src/routes/userIpfsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/nfts", nftRoutes);
app.use("/api/ipfs", ipfsRoutes);
app.use("/api/ipfs", userIpfsRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "AlgoMint API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      status: 404,
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AlgoMint server running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;
