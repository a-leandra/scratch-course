import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loading from "../../components/Layouts/Loading";
import ErrorMessage from "../Layouts/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import "./forms_styles.css";
import { activateAccount } from "../../actions/userActions";

function ActivateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userActivateAccount = useSelector((state) => state.userActivateAccount);
  const { loading, error } = userActivateAccount;

  const { userId, uniqueString } = useParams();

  useEffect(() => {
    if (userInfo) {
      navigate("/mapa-poziomow");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(activateAccount(userId, uniqueString, navigate));
  };

  return (
    <div className="ui raised very padded text container segment">
      <Form onSubmit={submitHandler}>
        <div className="form-inner">
          <h1 className="heading">Aktywacja konta</h1>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <div className="form-text">
            Aby aktywować konto prosimy o kliknięcie w przycisk poniżej.
          </div>
          <p />
          <Button type="submit" variant="primary">
            Aktywuj konto
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ActivateAccount;
