import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import arr from "../utils/teams";
import ExpandedCard from "./ExpandedCard";
import PulseLoader from "react-spinners/PulseLoader";

const TeamDetails = () => {
  const { id } = useParams();
  const ID = parseInt(id);
  const { name } = arr.find((ele) => ele.id === ID);

  const [matches, setMatches] = useState([]);
  const [year, setYear] = useState(2020);
  const [team, setTeam] = useState(name);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function helper() {
      if (team.substr(0, 5) === "Delhi") {
        if (year > 2018) {
          setTeam("Delhi Capitals");
        } else {
          setTeam(name);
        }
      }
      const url = `/api/year/team/matches`;

      setLoading(true);

      console.log(team);

      axios
        .get(url, {
          headers: {
            team: team,
            year: year,
          },
        })
        .then((res) => {
          console.log(res);
          setMatches(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
    helper();
  }, [year, team]);

  const yearsArray = Array.from({ length: 13 }, (x, i) => i + 2008);
  return (
    <div className="relative">
      <div className="fixed flex flex-col items-center w-1/6">
        {yearsArray.map((y) => {
          const curColor = y === year ? "text-green-400" : "text-white-100";

          return (
            <div
              className="group h-10 text-xl hover:cursor-pointer"
              onClick={() => setYear(y)}
            >
              <p className={`${curColor} group-focus:text-red-500`}>{y}</p>
            </div>
          );
        })}
      </div>
      <div className="fixed left-1/2 top-1/2">
        <PulseLoader color="blue" loading={loading} size={30} />
      </div>

      {!loading && (
        <div className="absolute right-2 w-4/5 ">
          <p className="font-bold text-l sm:text-xl sm:ml-5">{`${team} matches in year ${year}`}</p>
          {matches.map((match) => (
            <ExpandedCard match={match} curTeam={team} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
