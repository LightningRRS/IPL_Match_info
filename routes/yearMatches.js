const router = require("express").Router();

const pool = require("../db/db");

router.get("/", async (req, res) => {
  const { team, year } = req.headers;

  const query = `SELECT * FROM matches where ((team1 = $1 or team2 = $1) AND date_part('year', match_date) = $2 ) ORDER BY match_date DESC`;

  try {
    const matches = await pool.query(query, [team, year]);

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
