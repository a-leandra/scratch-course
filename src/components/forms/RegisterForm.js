import React, {useState} from "react";
import { Button, Form } from "react-bootstrap"

function RegisterForm({ TeacherRegister, error, addError, changeView}){
    const [details, setDetails] = useState({name: "", email: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();

        if(details.name.includes("<") || details.email.includes("<") || details.password.includes("<") ){
            console.log("Forbidden sign");
            addError("Forbidden sign in email");
        }
        /*else if(){ addError("Podany login jest już zajęty");}*/
        else{
            TeacherRegister(details);
        }
    }

        
    const loginHandler = e => {
        addError("");
        e.preventDefault();
        changeView("login");
    }
    const teacherRegisterHandler = e => {
        addError("");
        //e.preventDefault();
        changeView("teacherRegister");
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h1 className="heading">Zarejestruj się</h1>
                {(error!="" )? (<div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <Form.Label htmlFor="name">Name: </Form.Label>
                    <Form.Control type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}
                    style={{
                        minWidth:'30vw'
                    }}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="surname">Surame: </Form.Label>
                    <Form.Control type="text" name="surname" id="surname" onChange={e => setDetails({...details, surname: e.target.value})} value={details.surname}
                    style={{
                        minWidth:'30vw'
                    }}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="login">Login: </Form.Label>
                    <Form.Control type="login" name="login" id="login" onChange={e => setDetails({...details, login: e.target.value})} value={details.login}
                    style={{
                        minWidth:'30vw'
                    }}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="password">Password: </Form.Label>
                    <Form.Control type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} 
                    value={details.password}
                    style={{
                        minWidth:'30vw'
                    }}/>
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="code">Code: </Form.Label>
                    <Form.Control type="code" name="code" id="code" onChange={e => setDetails({...details, code: e.target.value})} value={details.code}
                    style={{
                        minWidth:'30vw'
                    }}/>
                </div>
                <div style={{display:"flex", flexDirection:"Row"}}>
                    <div>
                    <Button type="submit" variant="primary" value="Zarejestruj się">
                    Zarejestruj się
                    </Button>
                    </div>
                    <div style={{marginLeft:"70px"}}>
                    <Button onClick={loginHandler} type="loginView" variant="dark" >
                    Logowanie
                    </Button>
                    <Button onClick={() => teacherRegisterHandler()} type="teacherRegisterView" variant="dark" style={{marginLeft:"10px"}}>
                                            Jestem nauczycielem
                    </Button>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default RegisterForm;