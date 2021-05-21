const router = require("express").Router();

const pool = require("../db/db");

router.get("/", async (req, res) => {
  const { team } = req.headers;

  const query = `SELECT * FROM matches WHERE team1 = $1 or team2 = $1 ORDER BY match_date DESC`;

  try {
    const matches = await pool.query(query, [team]);

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
