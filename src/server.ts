const express = require("express");
const db = require("./config/postgresDB");
const bodyParser = require("body-parser");
import apiRoutes from "./apiRoutes";
import { Request, Response } from 'express'
import { redisClient, initializeRedis } from "./config/redisDB";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", async (req: Request, res: Response) => {
  try {
    // Check postgres connectivity
    await db.query("SELECT 1");
    // Check Redis connectivity, set and get key Arad
    await redisClient.set("test", "success");
    const testRes = await redisClient.get("test");
    if (testRes !== "success") {
      throw new Error("Redis key test is not set");
    }

    res.status(200).send(
      "<div style='display: flex; justify-content: center; align-items: center;'> \
        Server, database, and Redis are all connected \
        </div>"
    );
  } catch (error) {
    console.error("Connectivity error:", error);
    res.status(500).json({ status: "ERROR", message: "Connectivity issue" });
  } finally {
    await redisClient.del("test");
  }
});

app.get("/", (req: Request, res: Response) => {
  // have html with a boton, when pressed it goes to api/categories
  res.send(
    "<div style='display: flex; justify-content: center; align-items: center;'> \
      <a href='/api/categories'>Go to categories</a> \
    </div>"
  );
});

const startServer = async () => {
  try {
    await initializeRedis();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

startServer();