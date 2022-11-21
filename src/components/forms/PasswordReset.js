import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loading from "../../components/Layouts/Loading";
import ErrorMessage from "../Layouts/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import "./forms_styles.css";

function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();
  const { userId, resetString } = useParams();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(resetPassword(userId, resetString, password, navigate));
    }
  };

  return (
    <div className="ui raised very padded text container segment">
      <Form onSubmit={submitHandler}>
        <div className="form-inner">
          <h1 className="heading">Zresetuj swoje hasło</h1>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
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
          <Button type="submit" variant="primary">
            Zatwierdź
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PasswordReset;
