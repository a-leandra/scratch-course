import React, { useEffect, useState } from "react";
import ErrorMessage from "../Layouts/ErrorMessage";
import Loading from "../../components/Layouts/Loading";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./forms_styles.css";

function RegisterForm() {
  //const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register(name, surname, email, group, password));
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    navigate("/zaloguj");
  };

  const teacherRegisterHandler = (e) => {
    e.preventDefault();
    navigate("/zarejestruj-nauczyciela");
  };

  return (
    <div className="ui raised very padded text container segment">
      <Form onSubmit={submitHandler}>
        <div className="form-inner">
          <h1 className="heading">Zarejestruj się</h1>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}
          <div className="form-group">
            <Form.Label htmlFor="name">Imię</Form.Label>
            <Form.Control
              type="name"
              name="name"
              id="name"
              value={name}
              placeholder="Wprowadź imię"
              onChange={(e) => setName(e.target.value)}
              style={{
                minWidth: "30vw",
              }}
            />
          </div>
          <div className="form-group">
            <Form.Label htmlFor="surname">Nazwisko</Form.Label>
            <Form.Control
              type="surname"
              name="surname"
              id="surname"
              value={surname}
              placeholder="Wprowadź nazwisko"
              onChange={(e) => setSurname(e.target.value)}
              style={{
                minWidth: "30vw",
              }}
            />
          </div>
          <div className="form-group">
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Wprowadź e-mail"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                minWidth: "30vw",
              }}
            />
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
              style={{
                minWidth: "30vw",
              }}
            />
          </div>
          <div className="form-group">
            <Form.Label htmlFor="confirmpassword">Potwierdź hasło</Form.Label>
            <Form.Control
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              value={confirmpassword}
              placeholder="Powtórz hasło"
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                minWidth: "30vw",
              }}
            />
          </div>
          <div className="form-group">
            <Form.Label htmlFor="group">
              Kod grupy (jeśli został podany przez nauczyciela)
            </Form.Label>
            <Form.Control
              type="group"
              name="group"
              id="group"
              value={group}
              placeholder="Wprowadź kod grupy"
              onChange={(e) => setGroup(e.target.value)}
              style={{
                minWidth: "30vw",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "Row" }}>
            <div>
              <Button type="submit" variant="primary" value="Zarejestruj się">
                Zarejestruj się
              </Button>
            </div>
            <div style={{ marginLeft: "70px" }}>
              <Button onClick={loginHandler} type="loginView" variant="dark">
                Logowanie
              </Button>
              <Button
                type="teacherRegisterView"
                value="Jestem nauczycielem"
                onClick={teacherRegisterHandler}
                variant="dark"
                style={{ marginLeft: "10px" }}
              >
                Jestem nauczycielem
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
