// Navigation Bar with react-router-dom with bootstrap for an authorized user (teacher)
import React, { useEffect, useState } from "react";
import { NavLink, Link, useMatch, useResolvedPath } from "react-router-dom";
import { Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMap, faSchool } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/glowna");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand fs-4" to="/">
          Kurs Scratcha
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav text-center">
            {userInfo ? (
              <>
                {userInfo.isTeacher ? (
                  <li class="nav-item">
                    <Nav.Link
                      as={NavLink}
                      class="nav-link"
                      to="/panel-nauczyciela"
                    >
                      <FontAwesomeIcon icon={faSchool}> </FontAwesomeIcon> Panel
                      nauczyciela
                    </Nav.Link>
                  </li>
                ) : (
                  <></>
                )}
                <li class="nav-item">
                  <Nav.Link as={NavLink} class="nav-link" to="/mapa-poziomow">
                    <FontAwesomeIcon icon={faMap}> </FontAwesomeIcon> Mapa
                    poziomów
                  </Nav.Link>
                </li>
                <li class="nav-item">
                  <Nav.Link as={NavLink} class="nav-link " to="/profil">
                    <FontAwesomeIcon icon={faUser}> </FontAwesomeIcon> Profil
                  </Nav.Link>
                </li>
              </>
            ) : (
              <Nav />
            )}
          </ul>
          <ul class="navbar-nav ms-auto text-center">
            {userInfo ? (
              <>
                <Nav className="m-auto mx-3">Witaj {`${userInfo.name}`}!</Nav>
                <li class="nav-item">
                  <Link onClick={logoutHandler} class="btn btn-danger" to="/">
                    Wyloguj
                  </Link>
                </li>
              </>
            ) : (
              <li class="nav-item">
                <Link class="btn btn-primary" to="/zaloguj">
                  Zaloguj
                </Link>
              </li>
            )}
          </ul>
          {/* <ul>
            <li class="nav-item">
              <a target="_blank" href="http://localhost:8602?tmp">
                Scratch-GUI-TMP
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}
