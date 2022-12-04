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
  const { userInfo } = userLogin;

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error } = userResetPassword;

  const navigate = useNavigate();
  const { userId, resetString } = useParams();

  useEffect(() => {
    if (userInfo) {
      navigate("/mapa-poziomow");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = password.length;
    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const digitsPassword = digitsRegExp.test(password);
    const specialCharPassword = specialCharRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);

    if (password !== confirmpassword) {
      setMessage("Wprowadzone hasła muszą być takie same");
    } else {
      if (passwordLength === 0) {
        setMessage("Hasło nie może być puste");
      } else if (!uppercasePassword) {
        setMessage("Hasło musi zawierać przynajmniej jedną wielką literę");
      } else if (!lowercasePassword) {
        setMessage("Hasło musi zawierać przynajmniej jedną małą literę");
      } else if (!digitsPassword) {
        setMessage("Hasło musi zawierać przynajmniej jedną cyfrę");
      } else if (!specialCharPassword) {
        setMessage("Hasło musi zawierać przynajmniej jeden symbol specjalny");
      } else if (!minLengthPassword) {
        setMessage("Hasło musi zawierać przynajmniej 8 znaków");
      } else {
        setMessage(null);
        dispatch(resetPassword(userId, resetString, password, navigate));
      }
    }
  };

  return (
    <div className="ui raised very padded text container segment">
      <Form onSubmit={submitHandler}>
        <div className="form-inner">
          <h1 className="heading">Zresetuj swoje hasło</h1>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
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
