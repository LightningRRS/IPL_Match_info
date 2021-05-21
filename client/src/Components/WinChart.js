import React from "react";
import { PieChart } from "react-minimal-pie-chart";

function WinChart({ matches_loss, matches_win }) {
  const win = Math.round((matches_win / (matches_loss + matches_win)) * 100);
  const lose = 100 - win;
  const winper = `${win}%`;
  const lossper = `${lose}%`;
  return (
    <PieChart
      className="w-4/5 transition duration-200 transform hover:scale-110 hover:cursor-pointer"
      data={[
        { title: winper, value: matches_win, color: "green" },
        { title: lossper, value: matches_loss, color: "red" },
      ]}
      animate={true}
      animationDuration={1000}
    />
  );
}

export default WinChart;
