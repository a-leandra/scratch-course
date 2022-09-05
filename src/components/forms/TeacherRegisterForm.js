import React, {useState} from "react";
import { Form, Button } from "react-bootstrap"

function TeacherRegisterForm({ Register, error, addError, changeView}){
    const [details, setDetails] = useState({name: "", surname: "", login: "", email: "",phone:"", password: ""});

    const submitHandler = e => {
        e.preventDefault();

        if(details.name.includes("<") || details.email.includes("<") || details.password.includes("<") ){
            console.log("Forbidden sign");
            addError("Forbidden sign in email");
        }else{
            Register(details);
        }
    }

        
    const loginHandler = e => {
        addError("");
        e.preventDefault();
        changeView("login");
    }

    return (
        <Form onSubmit={submitHandler}>
            <div className="form-inner">
                <h1 className="heading">Zarejestruj się jako nauczyciel</h1>
                {(error!="" )? (<div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <Form.Label htmlFor="name">Name: </Form.Label>
                    <Form.Control type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="surname">Surame: </Form.Label>
                    <Form.Control type="text" name="surname" id="surname" onChange={e => setDetails({...details, surname: e.target.value})} value={details.surname}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="login">Login: </Form.Label>
                    <Form.Control type="login" name="login" id="login" onChange={e => setDetails({...details, login: e.target.value})} value={details.login}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="password">Password: </Form.Label>
                    <Form.Control type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="phone">Phone number: </Form.Label>
                    <Form.Control type="phone" name="phone" id="phone" onChange={e => setDetails({...details, phone: e.target.value})} value={details.phone}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="email">Email: </Form.Label>
                    <Form.Control type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <Button type="submit"> Zarejestruj się </Button>
                <Button type="loginView" onClick={loginHandler} variant="dark" style={{marginLeft:"20px"}}>Logowanie</Button>
            </div>

        </Form>
    )
}

export default TeacherRegisterForm;