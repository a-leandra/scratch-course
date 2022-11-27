import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loading from "../../components/Layouts/Loading";
import ErrorMessage from "../Layouts/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./forms_styles.css";

function LoginForm() {
  //const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const registerHandler = (e) => {
    e.preventDefault();
    navigate("/zarejestruj");
  };

  return (
    <div className="ui raised very padded text container segment">
      <Form onSubmit={submitHandler}>
        <div className="form-inner">
          <h1 className="heading">Zaloguj się</h1>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
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
          <div className="form-group">
            <Form.Label htmlFor="password">Hasło</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Wprowadź hasło"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </div>
          <Button type="submit" variant="primary">
            Zaloguj się
          </Button>
          <Button
            type="register"
            onClick={registerHandler}
            variant="dark"
            style={{ marginLeft: "20px" }}
          >
            Zarejestruj się
          </Button>
          <div className="form-group">
            <div className="form-text">
              <a href="/zapomniane-haslo">Zapomniałeś hasło?</a>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
