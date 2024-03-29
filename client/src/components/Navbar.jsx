import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLocalStorage = () => {
      const adminData = localStorage.getItem("admin");

      if (adminData) {
        setIsLoggedIn(true);
      }
    };

    checkLocalStorage();
  }, []);

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.reload();
  };

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
                  <a className="dropdown-item" href="/dashboard">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/editMenu">
                    Edit Menu
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/editTable">
                    Edit Table
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/orders">
                    Orders
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={logout}>
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
