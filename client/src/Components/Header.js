import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <header className={`app__header ${show && "app__headerBlack"}`}>
      <Link to="/">
        <img
          src="https://seeklogo.com/images/V/vivo-ipl-10-season-logo-952B1AA2D7-seeklogo.com.png"
          className="sm:top-10 h-10 sm:h-20 hover:cursor-pointer"
          alt="IPL Logo"
        />
      </Link>
      <p className="font-extrabold text-xl sm:text-5xl">IPL DASHBOARD</p>
    </header>
  );
};

export default Header;
