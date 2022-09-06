import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

function LoginForm({ changeView }) {
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
    changeView("register");
  };

  return (
    <div className="loginContainer">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Zaloguj się</h2>
          <div className="form-group">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Wprowadź swój adres e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="form-group">
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Wprowadź hasło"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </div>
          <input type="submit" value="Zaloguj się" />
          <input
            type="register"
            value="Zarejestruj się"
            onClick={registerHandler}
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
