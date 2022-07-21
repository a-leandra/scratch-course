import React, {useState} from "react";

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
        e.preventDefault();
        changeView("register");
    }

    return (
        <form onSubmit={submitHandler} >
            <div className="form-inner">
                <h2>Zaloguj się</h2>
                {(error!="" )? (<div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail: </label>
                    <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="Zaloguj się" />
                <input type="register" value="Zarejestruj się" onClick={registerHandler}/>
            </div>
            

        </form>
    )
}

export default LoginForm;