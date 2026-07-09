import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result =
      await pool.query(
        `
        SELECT
          calorie_goal,
          protein_goal
        FROM goals
        WHERE user_id = $1
        `,
        [1]
      );

    res.json(
      result.rows[0]
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch goals",
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const {
      calorie_goal,
      protein_goal,
    } = req.body;

    const result =
      await pool.query(
        `
        UPDATE goals
        SET
          calorie_goal = $1,
          protein_goal = $2
        WHERE user_id = $3
        RETURNING *
        `,
        [
          calorie_goal,
          protein_goal,
          1,
        ]
      );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error:
        "Failed to update goals",
    });
  }
});

export default router;