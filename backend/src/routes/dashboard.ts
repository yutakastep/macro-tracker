import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/today", async (_req, res) => {
  try {
    const userId = 1;

    const result = await pool.query(
      `
      SELECT
        COALESCE(SUM(f.calories * fe.servings), 0) AS calories,
        COALESCE(SUM(f.protein * fe.servings), 0) AS protein,
        COALESCE(SUM(f.carbs * fe.servings), 0) AS carbs,
        COALESCE(SUM(f.fat * fe.servings), 0) AS fat
      FROM food_entries fe
      JOIN foods f
        ON fe.food_id = f.id
      WHERE fe.user_id = $1
        AND fe.entry_date = CURRENT_DATE
      `,
      [userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch dashboard data",
    });
  }
});

export default router;