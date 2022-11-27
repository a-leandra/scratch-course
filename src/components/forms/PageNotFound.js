import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loading from "../../components/Layouts/Loading";
import ErrorMessage from "../Layouts/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./forms_styles.css";

function PageNotFound() {
  return (
    <div className="ui raised very padded text container segment">
      <div className="page-not-found">
        <h1 className="heading">Nie znaleziono strony</h1>
        Szukana strona nie istnieje lub jest uszkodzona
        <img
          src="https://i.postimg.cc/fRCDnYRV/119001172-5dac6200-b951-11eb-8e58-90632b81586c-removebg-preview.png"
          title="Happy Scratch"
        />
      </div>
    </div>
  );
}

export default PageNotFound;
