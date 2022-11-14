import React, { useEffect, useState } from "react";
import ErrorMessage from "../Layouts/ErrorMessage";
import Loading from "../../components/Layouts/Loading";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { teacherRegister } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./forms_styles.css";

function TeacherRegisterForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [task, setTask] = useState(null);
  const [isTeacher, setIsTeacher] = useState(true);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teacherUserRegister = useSelector((state) => state.teacherUserRegister);
  const { loading, error, userInfo } = teacherUserRegister;

  useEffect(() => {
    console.log(typeof userInfo);
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
      setIsTeacher(true);
      dispatch(
        teacherRegister(name, surname, email, 8, isTeacher, password, navigate) // teacher should have all task available <0,8>
      );
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    navigate("/zaloguj");
  };

  return (
    <div className="ui raised very padded text container segment">
      <Form onSubmit={submitHandler}>
        <div className="form-inner">
          <h1 className="heading">Zarejestruj się jako nauczyciel</h1>
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
            />
          </div>

          <Button type="submit"> Zarejestruj się </Button>
          <Button
            type="loginView"
            onClick={loginHandler}
            variant="dark"
            style={{ marginLeft: "20px" }}
          >
            Logowanie
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TeacherRegisterForm;
