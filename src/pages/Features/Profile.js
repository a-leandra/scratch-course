import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Profile = ({ user }) => {
  return (
    <div className="page">
      {
        <>
          <h1 className="heading">Zaktualizuj swoje informacje</h1>
          <hr />
        </>
      }
      <div>
        <Container>
          <Row className="profileContainer">
            <Col md={6}>
              <Form className="mb-3" /*onSubmit={submitHandler}*/>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Imię</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Wprowadź imię"
                    //value={name}
                    //onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="surname">
                  <Form.Label>Nazwisko</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Wprowadź nazwisko"
                    //value={name}
                    //onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Adres e-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Wprowadź e-mail"
                    //value={email}
                    //onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Hasło</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Wprowadź hasło"
                    //value={password}
                    //onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Zatwierdź hasło</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Powtórz hasło"
                    //value={confirmPassword}
                    //onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{" "}
                {/*{picMessage && (
                                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                                )}*/}
                <Form.Group className="mb-3" controlId="pic">
                  <Form.Label>Zmień zdjęcie profilowe</Form.Label>
                  <Form.Control
                    id="custom-file"
                    type="file"
                    label="Dodaj zdjęcie profilowe"
                    custom
                    //onChange={(e) => postDetails(e.target.files[0])}
                  ></Form.Control>
                </Form.Group>
                <Button
                  /*onClick={() => updateUser(user.id)}*/ type="submit"
                  variant="primary"
                >
                  Zaktualizuj
                </Button>
                <Button
                  /*onClick={() => deleteUser(user.id)}*/ style={{
                    float: "right",
                  }}
                  type="delete"
                  variant="danger"
                >
                  Usuń konto
                </Button>
              </Form>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                className="ui avatar image"
                //src={user.avatarSrc === "" ? noAvatar : user.avatarSrc}
                alt="Avatar"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
