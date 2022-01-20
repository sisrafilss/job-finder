import React from "react";
import { Link } from "react-router-dom";

import video from "../../assets/media/video/404-space.mp4";
import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <>
      <div className="bg-vdo">
        <video
          autoPlay
          loop
          muted
          className="bg-vdo"
          src={video}
          type="video/mp4"
        ></video>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <button className="back-btn">
          <Link className="not-link" to="/home">
            Back To Home
          </Link>
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
