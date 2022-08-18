import React, { pageState, useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import TeacherRegisterForm from '../components/forms/TeacherRegisterForm';
import '../user_management_styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from "../store/userState.js";

function UserManagement() {
  const adminUser ={   // retreive from database
    email: "admin@admin.com",
    password: "admin1234"
  }
  const [user, setUser] = useState({name:"", email:""});
  const [error, setError] = useState("");
  const [currentView, setView] = React.useState("loginView");

  const Login = details => {
    console.log(details);
    setError("");

    if (details.email == adminUser.email && details.password == adminUser.password){
      console.log("logged in");
      setUser({
          name: details.name,
          email: details.email,
          password: details.password
        });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useDispatch();
      dispatch(setLoggedIn());
    }else{
      console.log("Details do not match");
      setError("Email or password do not match ");
    }
  }

  const Register = details => {
    console.log(details);
    setError("");

    if (true){    // dodac spr i zapis do bazy danych
      console.log("Zarejestrowano");
      setUser({
          name: details.name,
          surname: details.surname,
          email: details.email,
          password: details.password,
          code:details.code
        });
    }else{
      console.log("Details do not match");
      setError("Email or password do not match ");
    }
  }
  

  const TeacherRegister = details => {
    console.log(details);
    setError("");

    if (true){    // dodac spr z baza danych
      console.log("Zarejestrowano");
      setUser({
          name: details.name,
          surname: details.surname,
          email: details.email,
          login: details.login,
          password: details.password,
          phone: details.phone
        });
    }else{
      console.log("Details do not match");
      setError("Email or password do not match ");
    }
  }

  const addError = message => {
    setError(message);
  }
  
  const changeView = opt => {
    if(opt==="register" ){
      setView("registerView");
    }
    else if(opt ==="login"){
      setView("loginView");
    }
    else{
      setView("teacherRegisterView");
    }
  }

  const Logout = () => {
    console.log("Logout");
    setUser({name:"", email:""});
  }



  const LoginView = ({onClick}) => (
    <div>
      <LoginForm Login={Login} error={error} addError={addError} changeView={changeView}/>
    </div>
  );
  
  const RegisterView = ({onClick}) => (
    <div>
      <RegisterForm Register={Register} error={error} addError={addError} changeView={changeView}/>
    </div>
  );
    
  const TeacherRegisterView = ({onClick}) => (
    <div>
      <TeacherRegisterForm TeacherRegister={TeacherRegister} error={error} addError={addError} changeView={changeView}/>
    </div>
  );

  return (
    <div className="ui raised very padded text container segment"
      style={{
        minWidth:'30%',
      }}>
      {(user.email != "") ? (
        <div className="welcome">
          <h1>Welcome, <span>{user.name}</span> </h1>
          <button onClick={Logout}>Logout</button>
        </div>

      ) : (
          <div>
        {
          currentView === "loginView" ? 
          <LoginView  onClick={page => setView(page) } /> : currentView === "registerView" ?
          <RegisterView onClick={page => setView(page)} /> : 
          <TeacherRegisterView onClick={page => setView(page)} />
       }
      </div>

      ) }
    </div>
  );
}

export default UserManagement;
