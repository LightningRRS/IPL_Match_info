import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ClimbingBoxLoader from "react-spinners/PacmanLoader";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      backgroundColor: "#06202A",
      color: "white",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row[0].bowler}
        </TableCell>
        <TableCell align="right">{row[0].over + 1}</TableCell>
        <TableCell align="right">
          {
            row.reduce((a, b) => {
              return { total_runs: a.total_runs + b.total_runs };
            }).total_runs
          }
        </TableCell>
        <TableCell align="right">
          {
            row.reduce((a, b) => {
              return { is_wicket: a.is_wicket + b.is_wicket };
            }).is_wicket
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {`Over ${row[0].over + 1} Stats`}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Batsman</TableCell>
                    <TableCell>Non-Striker</TableCell>
                    <TableCell>Runs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((ball) => (
                    <TableRow key={ball.p_key}>
                      <TableCell component="th" scope="row">
                        {ball.batsman}
                      </TableCell>
                      <TableCell>{ball.non_striker}</TableCell>
                      <TableCell>{ball.total_runs + ball.extra_runs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const BallByBall = () => {
  const { id } = useParams();

  const [match, setMatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inning1, setInning1] = useState({ team: "", runs: 0, wickets: 0 });
  const [inning2, setInning2] = useState({ team: "", runs: 0, wickets: 0 });

  useEffect(() => {
    const helper = async () => {
      setLoading(true);
      const url = "/api/match/details";
      axios
        .get(url, {
          headers: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res);
          setMatch(res.data);
        })
        .catch((err) => console.log(err.message));
    };
    helper();
  }, []);

  useEffect(() => {
    if (match.length > 0) {
      setInning1({
        runs: match
          .filter((m) => m.inning === "1")
          .reduce((a, b) => ({ total_runs: a.total_runs + b.total_runs }))
          .total_runs,
        team: match[0].batting_team,
        wickets: match
          .filter((m) => m.inning === "1")
          .reduce((a, b) => {
            return { is_wicket: a.is_wicket + b.is_wicket };
          }).is_wicket,
      });
      setInning2({
        runs: match
          .filter((m) => m.inning === "2")
          .reduce((a, b) => ({ total_runs: a.total_runs + b.total_runs }))
          .total_runs,
        team: match[match.length - 1].batting_team,
        wickets: match
          .filter((m) => m.inning === "2")
          .reduce((a, b) => {
            return { is_wicket: a.is_wicket + b.is_wicket };
          }).is_wicket,
      });
      setLoading(false);
    }
  }, [match]);

  const blStyle = useRowStyles();

  return (
    <div className="flex flex-col justify-around max-w-full">
      <div className="flex flex-col items-center">
        <ClimbingBoxLoader color="#06F8E6" loading={loading} size={30} />
      </div>
      {!loading && (
        <div className="flex flex-col items-center">
          <div className="border-b-2 border-gray-100 w-full flex justify-between items-center mb-5 p-3 h-25">
            <div className="flex flex-col items-center justify-evenly">
              <p className="text-2xl font-extrabold ">Inning - 1</p>
              <p>{inning1.team}</p>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <p className="text-2xl font-extrabold ">Runs</p>
              <p>{inning1.runs}</p>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <p className="text-2xl font-extrabold ">Wickets</p>
              <p>{inning1.wickets}</p>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow className={blStyle.root}>
                  <TableCell />
                  <TableCell>Bowler</TableCell>
                  <TableCell align="right">Over</TableCell>
                  <TableCell align="right">Total Runs</TableCell>
                  <TableCell align="right">Total Wickets</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from(
                  {
                    length:
                      match[
                        match.findIndex(
                          (m) =>
                            m.inning === "2" && m.over === 0 && m.ball === 1
                        ) - 1
                      ].over + 1,
                  },
                  (x, i) => i
                ).map((_, i) => (
                  <Row
                    key={i}
                    row={match.filter((m) => m.inning == "1" && m.over === i)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="border-b-2 border-gray-100 w-full flex justify-between mb-5 p-3 h-25">
            <div className="flex flex-col items-center justify-evenly">
              <p className="text-2xl font-extrabold ">Inning - 2</p>
              <p>{inning2.team}</p>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <p className="text-2xl font-extrabold ">Runs</p>
              <p>{inning2.runs}</p>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <p className="text-2xl font-extrabold ">Wickets</p>
              <p>{inning2.wickets}</p>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow className={blStyle.root}>
                  <TableCell />
                  <TableCell>Bowler</TableCell>
                  <TableCell align="right">Over</TableCell>
                  <TableCell align="right">Total Runs</TableCell>
                  <TableCell align="right">Total Wickets</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from(
                  { length: match[match.length - 1].over + 1 },
                  (x, i) => i
                ).map((_, i) => (
                  <Row
                    key={i}
                    row={match.filter((m) => m.inning == "2" && m.over === i)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default BallByBall;
