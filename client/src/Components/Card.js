import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, url, name }) => {
  return (
    <div>
      <Link
        to={`/team/${id}`}
        className="no-underline py-auto my-3 h-20 mx-auto w-11/12 sm:w-10/12 sm:h-80 sm:mx-auto sm:my-10 flex justify-between items-center border-2 rounded-md border-gray-100
     sm:hover:bg-gray-100 sm:hover:border-black sm:hover:text-black transition duration-200 transform sm:hover:scale-105 hover:cursor-pointer"
      >
        <img
          className="block rounded-full h-12 sm:h-40 ml-5
        "
          src={url}
          alt={name}
        />
        <p className="text-xl mr-5 sm:mr-10 sm:text-2xl font-semibold ">
          {name}
        </p>
      </Link>
    </div>
  );
};

export default Card;
