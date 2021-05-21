import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./error.css";

const Error = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://kit.fontawesome.com/4b9ba14b0f.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div class="mainbox">
      <div class="err">4</div>
      <i class="far fa-question-circle fa-spin"></i>
      <div class="err2">4</div>
      <div class="msg">
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <p>
          Let's go{" "}
          <a className="no-underline" href="/">
            home
          </a>{" "}
          and try from there.
        </p>
      </div>
    </div>
  );
};

export default Error;
