// Navigation Bar with react-router-dom with bootstrap for an authorized user (student)

import { NavLink, Link, useMatch, useResolvedPath } from "react-router-dom"
import {Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMap, faSchool } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  return <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
  <Link class="navbar-brand fs-4" to="/">Scratch Course</Link>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav text-center">
      <li class="nav-item">
        <Nav.Link as={NavLink} class="nav-link" to="/map"><FontAwesomeIcon icon={faMap}> </FontAwesomeIcon> Mapa poziomów</Nav.Link>
      </li>
      <li class="nav-item">
        <Nav.Link as={NavLink} class="nav-link " to="/profile"><FontAwesomeIcon icon={faUser}> </FontAwesomeIcon> Profil</Nav.Link>
      </li>
    </ul>
    <ul class="navbar-nav ms-auto text-center">
      <li class="nav-item">
        <Link class="btn btn-danger" to="/logout">Wyloguj</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>
}