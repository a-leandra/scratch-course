import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ErrorMessage from "../../components/Layouts/ErrorMessage";
import Loading from "../../components/Layouts/Loading";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Profile = ({ changeView }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setSurname(userInfo.surname);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(update({ name, surname, email, password }));
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    changeView("login");
  };
  const teacherRegisterHandler = (e) => {
    e.preventDefault();
    changeView("teacherRegister");
  };

  return (
    <Form onSubmit={submitHandler}>
      {loading && <Loading />}
      {success && (
        <ErrorMessage variant="success">Updated Succcessfully</ErrorMessage>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      <div className="form-inner">
        <h1 className="heading">Zaktualizuj swoje informacje</h1>
        <div className="form-group">
          <Form.Label htmlFor="name">Imię</Form.Label>
          <Form.Control
            type="text"
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
            type="text"
            name="surname"
            id="surname"
            value={surname}
            placeholder="Wprowadź nazwisko"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <Form.Label htmlFor="email">Adres e-mail</Form.Label>
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
          <Form.Label htmlFor="confirmpassword">Zatwierdź hasło</Form.Label>
          <Form.Control
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            value={confirmpassword}
            placeholder="Powtórz hasło"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button type="submit" variant="primary">
          Zapisz
        </Button>
        {/*<input
              type="teacherRegisterView"
              value="Usuń konto"
              onClick={teacherRegisterHandler}
          />*/}
      </div>
    </Form>
  );
};

export default Profile;
