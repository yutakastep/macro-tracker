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

// GET food entries based on id
// similar process as done with foods

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid entry ID",
      });
    }

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
      WHERE fe.id = $1
        AND fe.user_id = $2
      `,
      [id, 1]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Food entry not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch food entry",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid entry ID",
      });
    }

    const result = await pool.query(
      `
      DELETE FROM food_entries
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
      [id, 1]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Entry not found",
      });
    }

    res.json({
      message: "Entry deleted",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete entry",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { servings } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid entry ID",
      });
    }

    if (!servings || servings <= 0) {
      return res.status(400).json({
        error: "Servings must be greater than zero",
      });
    }

    const result = await pool.query(
      `
      UPDATE food_entries
      SET servings = $1
      WHERE id = $2
      AND user_id = $3
      RETURNING *
      `,
      [
        servings,
        id,
        1,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Entry not found",
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update entry",
    });
  }
});

export default router;