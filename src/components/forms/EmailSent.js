import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loading from "../../components/Layouts/Loading";
import ErrorMessage from "../Layouts/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import "./forms_styles.css";

function EmailSent() {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const { userEmail, reset } = useParams();

  useEffect(() => {
    if (userInfo) {
      navigate("/mapa-poziomow");
    }
  }, [userInfo]);

  const loginHandler = (e) => {
    e.preventDefault();
    navigate("/zaloguj");
  };

  const renderElement = (reset, userEmail) => {
    if (reset && userEmail) {
      return (
        <div className="form-inner">
          <h1 className="heading">Resetowanie hasła</h1>
          <div className="form-text">
            Na Twój adres e-mail: <b>{userEmail}</b> została wysłana wiadomość z
            linkiem do zresetowania hasła. Sprawdź skrzynkę pocztową i zresetuj
            hasło.
          </div>
        </div>
      );
    } else if (!reset && userEmail) {
      return (
        <div className="form-inner">
          <h1 className="heading">Aktywacja konta</h1>
          <div className="form-text">
            Na Twój adres e-mail: <b>{userEmail}</b> została wysłana wiadomość z
            linkiem do aktywacji Twojego nowego konta. Sprawdź skrzynkę pocztową
            i aktywuj konto.
          </div>
        </div>
      );
    } else if (!reset && !userEmail) {
      return (
        <div className="form-inner">
          <h1 className="heading">Resetowanie hasła</h1>
          <div className="form-text">
            Twoje hasło zostało pomyślnie zresetowane. Możesz się teraz
            zalogować korzystając z nowego hasła.
          </div>
          <Button type="login" onClick={loginHandler} variant="primary">
            Zaloguj się
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="ui raised very padded text container segment">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {renderElement(reset, userEmail)}
    </div>
  );
}

export default EmailSent;
