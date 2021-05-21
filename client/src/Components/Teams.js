import React from "react";

import arr from "../utils/teams";
import Card from "./Card";

const Teams = () => {
  return (
    <div>
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2">
        {arr.map(({ url, name, id }) => (
          <Card key={name} url={url} name={name} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Teams;
