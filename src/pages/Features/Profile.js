import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
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
    <div className="ui raised very padded text container segment">
      <div className="loginContainer">
        <form onSubmit={submitHandler}>
          {loading && <Loading />}
          {success && (
            <ErrorMessage variant="success">Updated Succcessfully</ErrorMessage>
          )}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          <div className="form-inner">
            <h2>Zaktualizuj swoje informacje</h2>
            <div className="form-group">
              <Form.Group controlId="name">
                <Form.Label>Imię</Form.Label>
                <Form.Control
                  type="text"
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
                  type="text"
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

            <input type="submit" value="Zapisz" />
            <input
              type="teacherRegisterView"
              value="Usuń konto"
              onClick={teacherRegisterHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
