import React from "react";
import { Link } from "react-router-dom";

function ExpandedCard({ match, curTeam }) {
  const {
    id,
    match_date,
    player_of_match,
    venue,
    winner,
    result,
    result_margin,
    umpire1,
    umpire2,
    inning_1,
    inning_2,
  } = match;

  const color = winner === curTeam ? "bg-green-700" : "bg-red-700";

  const oppositeTeam = inning_1 === curTeam ? inning_2 : inning_1;
  return (
    <Link className="no-underline" to={`/match/details/${id}`}>
      <div className={`${color} flex justify-between m-1 p-1 sm:m-5 sm:p-3`}>
        <div className="flex flex-col">
          <p className="text-sm">vs</p>
          <p className="text-md sm:text-2xl">{oppositeTeam}</p>
          <p className="font-bold sm:text-xl">{match_date.substr(0, 10)}</p>
          <p className="text-sm">at {venue}</p>
          <p className="text-md sm:text-xl w-min sm:w-max">
            {winner} won by {result_margin} {result}
          </p>
        </div>

        <div className="flex flex-col sm:w-max">
          <div className="hidden sm:block font-bold text-md sm:text-xl">
            First Innings
          </div>
          <div className="hidden sm:block text-sm text-gray-100">
            {inning_1}
          </div>
          <div className="hidden sm:block font-bold text-md sm:text-xl">
            Second Innings
          </div>
          <div className="hidden sm:block text-sm text-gray-100">
            {inning_2}
          </div>
          <div className="dis font-bold text-md sm:text-xl">
            Man of the match
          </div>
          <div className="text-sm text-gray-100">{player_of_match}</div>
          <div className="dis font-bold text-md sm:text-xl ">Umpires</div>
          <div className="text-sm w-min text-gray-100">
            {umpire1}, {umpire2}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ExpandedCard;
