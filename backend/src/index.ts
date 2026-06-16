import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import foodsRouter from "./routes/foods.js";
import foodEntriesRouter from "./routes/foodEntries.js";
import dashboardRouter from "./routes/dashboard.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    status: "API running",
  });
});

app.get("/db-test", async (_req, res) => {
  const result = await pool.query("SELECT NOW()");

  res.json(result.rows[0]);
});

const PORT = 5000;

app.use("/foods", foodsRouter);

app.use("/food-entries", foodEntriesRouter);

app.use("/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

