// Navigation Bar with react-router-dom with bootstrap for an authorized user (teacher)

import { NavLink, Link, useMatch, useResolvedPath } from "react-router-dom"
import {Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMap, faSchool } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

export default function Navbar() {
  return <nav class="navbar navbar-expand-lg navbar-light bg-light"
            style={{ visibility: useSelector(state => state.pageState.value === 0 ? 'hidden' : 'visible')}}>
    <div class="container-fluid">
  <Link class="navbar-brand fs-4" to="/">Scratch Course</Link>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav text-center">
      <li class="nav-item">
        <Nav.Link as={NavLink} class="nav-link" to="/panel-nauczyciela"><FontAwesomeIcon icon={faSchool}> </FontAwesomeIcon> Panel nauczyciela</Nav.Link>
      </li>
      <li class="nav-item">
        <Nav.Link as={NavLink} class="nav-link" to="/mapa-poziomow"><FontAwesomeIcon icon={faMap}> </FontAwesomeIcon> Mapa poziomów</Nav.Link>
      </li>
      <li class="nav-item">
        <Nav.Link as={NavLink} class="nav-link " to="/profil"><FontAwesomeIcon icon={faUser}> </FontAwesomeIcon> Profil</Nav.Link>
      </li>
    </ul>
    <ul class="navbar-nav ms-auto text-center">
      <li class="nav-item">
        <Nav.Link as={NavLink} class="btn btn-primary" to="/zaloguj"><FontAwesomeIcon icon={faUser}> </FontAwesomeIcon>Zaloguj</Nav.Link>
      </li>
      <li class="nav-item">
        <Link class="btn btn-danger" to="/glowna">Wyloguj</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>
}