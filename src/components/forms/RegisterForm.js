import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { Form } from "react-bootstrap";

function RegisterForm({ TeacherRegister, error, addError, changeView }) {
  //const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "/api/users",
          {
            name,
            surname,
            email,
            group,
            password,
          },
          config
        );

        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setLoading(false);
        addError(error.response.data.message);
      }
    }
  };

  const loginHandler = (e) => {
    addError("");
    e.preventDefault();
    changeView("login");
  };
  const teacherRegisterHandler = (e) => {
    addError("");
    e.preventDefault();
    changeView("teacherRegister");
  };

  return (
    <div className="loginContainer">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Zarejestruj się</h2>
          <div className="form-group">
            <Form.Group controlId="name">
              <Form.Label>Imię</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Wprowadź imię"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="form-group">
            <Form.Group controlId="surname">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                type="surname"
                value={surname}
                placeholder="Wprowadź nazwisko"
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="form-group">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adres e-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Wprowadź e-mail"
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
          <div className="form-group">
            <Form.Group controlId="confirmPassword">
              <Form.Label>Zatwierdź hasło</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="Powtórz hasło"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="form-group">
            <Form.Group controlId="group">
              <Form.Label>Kod grupy</Form.Label>
              <Form.Control
                type="group"
                value={group}
                placeholder="Wprowadź kod grupy"
                onChange={(e) => setGroup(e.target.value)}
              />
            </Form.Group>
          </div>

          <input type="submit" value="Zarejestruj się" />
          <input type="loginView" value="Zaloguj się" onClick={loginHandler} />
          <div>
            <input
              type="teacherRegisterView"
              value="Jestem nauczycielem"
              onClick={teacherRegisterHandler}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
