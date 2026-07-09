import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM foods ORDER BY name"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch foods",
    });
  }
});

//get food based on ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await pool.query(
    "SELECT * FROM foods WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: "Food not found",
    });
  }

  res.json(result.rows[0]);
});


/* FOR EVERY OPERATION, NEED NEW ROUTE */


// when someone sends post request to /foods, run this function
router.post("/", async (req, res) => {
  try {
    const {
      name,
      calories,
      protein,
      carbs,
      fat,
    } = req.body;

    const normalizedName = name?.trim();

    if (
      !normalizedName ||
      calories == null ||
      protein == null ||
      carbs == null ||
      fat == null
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    if (
      calories < 0 ||
      protein < 0 ||
      carbs < 0 ||
      fat < 0
    ) {
      return res.status(400).json({
        error: "Nutrition values cannot be negative",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO foods
      (name, calories, protein, carbs, fat)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        normalizedName,
        calories,
        protein,
        carbs,
        fat,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return res.status(409).json({
        error: "Food already exists",
      });
    }

    res.status(500).json({
      error: "Failed to create food",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      calories,
      protein,
      carbs,
      fat,
    } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid entry ID",
      });
    }

    const result = await pool.query(
      `
      UPDATE foods
      SET
        name = $1,
        calories = $2,
        protein = $3,
        carbs = $4,
        fat = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        name,
        calories,
        protein,
        carbs,
        fat,
        id,
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

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      `
      DELETE FROM foods
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    res.json(result.rows[0]);

  } catch (error: any) {
    console.error(error);

    if (error.code === "23503") {
      return res.status(400).json({
        error:
          "Cannot delete food because it is used by existing entries",
      });
    }

    res.status(500).json({
      error: "Failed to delete food",
    });
  }
});

export default router;