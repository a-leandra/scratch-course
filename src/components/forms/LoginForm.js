import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function LoginForm({ Login, error, addError, changeView }) {
  //const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      addError(false);
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      addError(error.response.data.message);
      setLoading(false);
    }
  };

  const registerHandler = (e) => {
    addError("");
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
