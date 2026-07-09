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

export default router;