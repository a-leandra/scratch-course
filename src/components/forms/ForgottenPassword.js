import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loading from "../../components/Layouts/Loading";
import ErrorMessage from "../Layouts/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { forgottenPassword } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./forms_styles.css";

function ForgottenPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirectUrl = "http://localhost:3000/resetowanie-hasla";

  useEffect(() => {
    if (userInfo) {
      navigate("/mapa-poziomow");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgottenPassword(email, redirectUrl, navigate));
  };

  return (
    <div className="ui raised very padded text container segment">
      <Form onSubmit={submitHandler}>
        <div className="form-inner">
          <h1 className="heading">Zresetuj hasło</h1>
          <div className="form-group">
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Wprowadź swój adres e-mail"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </div>
          <Button type="submit" variant="primary">
            Wyślij link
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ForgottenPassword;
