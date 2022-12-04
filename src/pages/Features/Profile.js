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

    dispatch(update({ name, surname, email }));
  };

  return (
    <div className="ui raised very padded text container segment">
      <h1 className="heading">Zaktualizuj swoje informacje</h1>
      <div>
        <Form onSubmit={submitHandler}>
          {loading && <Loading />}
          {success && (
            <ErrorMessage variant="success">
              Pomyślnie zaktualizowano profil
            </ErrorMessage>
          )}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          <div className="form-inner">
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
            <Button type="submit" variant="primary">
              Zapisz
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
