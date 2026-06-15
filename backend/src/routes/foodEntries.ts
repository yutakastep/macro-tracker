import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Implement POST food-entries

router.post("/", async (req, res) => {
  try {
    const {
      foodId,
      servings,
      entryDate,
    } = req.body;

    const userId = 1;

    const result = await pool.query(
      `
      INSERT INTO food_entries
      (
        user_id,
        food_id,
        servings,
        entry_date
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        userId,
        foodId,
        servings,
        entryDate,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create entry"
    });
  }
});


// Implement GET food-entries

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        fe.id,
        f.name,
        fe.servings,
        fe.entry_date,
        fe.created_at
      FROM food_entries fe
      JOIN foods f
        ON fe.food_id = f.id
      WHERE fe.user_id = $1
      ORDER BY fe.entry_date DESC
      `,
      [1]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch entries",
    });
  }
});


export default router;