import React, {useState} from "react";

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
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Zarejestruj się</h2>
                {(error!="" )? (<div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surame: </label>
                    <input type="text" name="surname" id="surname" onChange={e => setDetails({...details, surname: e.target.value})} value={details.surname}/>
                </div>
                <div className="form-group">
                    <label htmlFor="login">Login: </label>
                    <input type="login" name="login" id="login" onChange={e => setDetails({...details, login: e.target.value})} value={details.login}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone number: </label>
                    <input type="phone" name="phone" id="phone" onChange={e => setDetails({...details, phone: e.target.value})} value={details.phone}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <input type="submit" value="Zarejestruj się" />
                <input type="loginView" value="Zaloguj się" onClick={loginHandler}/>
            </div>

        </form>
    )
}

export default TeacherRegisterForm;