import React, { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            IDKP
          </a>
          {isLoggedIn ? (
            <div className="nav-item dropdown login-opt">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Edit Menu
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Edit Table
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <a
              className="nav-link active login-btn"
              aria-current="page"
              href="/login"
            >
              Login
            </a>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
