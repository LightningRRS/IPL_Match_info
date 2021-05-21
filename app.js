var express = require("express");
var path = require("path");
var logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "./client/build")));

if (process.env.NODE_ENV === "production") {
  // static content serve
  app.use(express.static(path.join(__dirname, "./client/build")));
}

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
require("dotenv").config();

const teamMatches = require("./routes/teamMatches");
const yearMatches = require("./routes/yearMatches");
const ballByBall = require("./routes/ballByBall");

app.use("/api/team/matches", teamMatches);
app.use("/api/year/team/matches", yearMatches);
app.use("/api/match/details", ballByBall);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

module.exports = app;
