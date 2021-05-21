const router = require("express").Router();

const pool = require("../db/db");

router.get("/", async (req, res) => {
  const { id } = req.headers;

  const query = `SELECT * FROM ball_by_ball where id = $1 ORDER BY inning ASC,over ASC,ball ASC`;

  try {
    const matches = await pool.query(query, [id]);

    if (matches.rows.length > 0) res.status(200).json(matches.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      status: "Failed",
      message: "Could not find any data",
      error: "Server error",
    });
  }
});

module.exports = router;
