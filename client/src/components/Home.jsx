import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="card-center">
          <img src="/images/qr.png" alt="qr" className="qr-wall" />
          <Link to={"/qr-scan"}>
            <button type="button" className="btn btn-info">
              Scan QR
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
