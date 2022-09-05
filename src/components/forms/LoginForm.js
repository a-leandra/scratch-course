import React, {useState} from "react";
import { Form } from "react-bootstrap"
import { useSelector } from 'react-redux'
import { Button } from "react-bootstrap"


function LoginForm({ Login, error, addError, changeView}){
    const [details, setDetails] = useState({name: "", email: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();

        if(details.name.includes("<") || details.email.includes("<") || details.password.includes("<") ){
            console.log("Forbidden sign");
            addError("Forbidden sign in email");
        }else{
            Login(details);
        }
    }
    
    const registerHandler = e => {
        addError("");
        changeView("register");
    }

    return (
        <Form onSubmit={submitHandler} >
            <div className="form-inner">
                <h1 className="heading">Zaloguj się</h1>
                {(error!="" )? (<div className="error">{error}</div>) : ""}
                <div className="form-group">
                        <Form.Label htmlFor="name">Login</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Wprowadź login..."
                            onChange={e => setDetails({...details, name: e.target.value})}
                            value={details.name}
                            style={{
                                minWidth:'30vw'
                            }}
                        ></Form.Control>
                    </div>
                    <div className="form-group">
                        <Form.Label htmlFor="email">E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Wprowadź email..."
                            onChange={e => setDetails({...details, email: e.target.value})}
                            value={details.email}
                            style={{
                                minWidth:'30vw'
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <Form.Label htmlFor="password">Hasło</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Wprowadź hasło..."
                            onChange={e => setDetails({...details, password: e.target.value})}
                            value={details.password}
                            style={{
                                minWidth:'30vw'
                            }}
                        ></Form.Control>
                    </div>
                {/* <input type="submit" value="Zaloguj się" />
                <input type="register" value="Zarejestruj się" onClick={registerHandler}/> */}
                <Button type="submit" variant="primary">
                                        Zaloguj się
                </Button>
                <Button onClick={() => registerHandler()} type="register" variant="dark" style={{marginLeft:"20px"}}>
                                        Zarejestruj się
                </Button>
            </div>
            

        </Form>
    )
}

export default LoginForm;