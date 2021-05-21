import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import arr from "../utils/teams";
import axios from "axios";
import ExpandedCard from "./ExpandedCard";
import MiniCard from "./MiniCard";
import WinChart from "./WinChart";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const TeamInfo = () => {
  const { id } = useParams();
  console.log("ID =>   ", id);
  const ID = parseInt(id);

  const [matches, setmatches] = useState([]);

  const { name } = arr.find((ele) => ele.id === ID);

  useEffect(() => {
    async function helper() {
      const url = `/api/team/matches/`;
      console.log(name);
      console.log(url);

      axios
        .get(url, {
          headers: {
            team: name,
          },
        })
        .then((res) => {
          console.log(res);
          setmatches(res.data);
        });
    }
    helper();
  }, []);

  let total = 0;
  let wins = 0;
  if (matches.length > 0) {
    total = matches.length;
    wins = matches.filter((match) => match.winner === name).length;
  }

  return (
    <div>
      <div className="flex justify-between items-center pt-5 sm:pt-10">
        <p className="p-5 text-3xl font-extrabold">{name}</p>
        <div>
          {matches.length > 0 && (
            <WinChart matches_win={wins} matches_loss={total - wins} />
          )}
        </div>
      </div>
      <p className="text-xl p-5">Latest Match</p>
      <div>
        {matches.length > 0 && (
          <ExpandedCard match={matches[0]} curTeam={name} />
        )}
      </div>

      <div className="grid sm:grid-cols-4 space-x-1">
        <div>
          {matches.length > 0 && <MiniCard match={matches[1]} curTeam={name} />}
        </div>
        <div>
          {matches.length > 0 && <MiniCard match={matches[2]} curTeam={name} />}
        </div>
        <div>
          {matches.length > 0 && <MiniCard match={matches[3]} curTeam={name} />}
        </div>
        <Link
          to={`/team/${id}/more`}
          className="flex flex-wrap items-center justify-center group no-underline"
        >
          <p>More</p>
          <ChevronRightIcon className="h-5 w-5 group-hover:animate-bounce" />
        </Link>
      </div>
    </div>
  );
};

export default TeamInfo;
