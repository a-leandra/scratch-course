import React from "react";
import "./index.css";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TeacherPanel from "./components/TeacherPanel/pages/TeacherPanel";
import LevelMap from "./pages/Features/LevelMap";
import Profile from "./pages/Features/Profile";
import About from "./pages/Information/About";
import Contact from "./pages/Information/Contact";
import Privacy from "./pages/Information/Privacy";
import { createMemoryHistory } from "history";
import MainPage from "./pages/Information/MainPage";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import TeacherRegisterForm from "./components/forms/TeacherRegisterForm";
import ForgottenPassword from "./components/forms/ForgottenPassword";
import EmailSent from "./components/forms/EmailSent";
import PasswordReset from "./components/forms/PasswordReset";
import ActivateAccount from "./components/forms/ActivateAccount";
import PageNotFound from "./components/forms/PageNotFound";

const App = () => {
  const history = createMemoryHistory({ reducer: {} });
  return (
    <div className="App">
      <BrowserRouter location={history.location} navigator={history}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/glowna" />} />
          <Route path="/glowna" element={<MainPage />} />
          <Route path="/zaloguj" element={<LoginForm />} />
          <Route path="/zarejestruj" element={<RegisterForm />} />
          <Route
            path="zarejestruj-nauczyciela"
            element={<TeacherRegisterForm />}
          />
          <Route path="/zapomniane-haslo" element={<ForgottenPassword />} />
          <Route path="/email-wyslany" element={<EmailSent />} />
          <Route path="/email-wyslany/:userEmail" element={<EmailSent />} />
          <Route
            path="/email-wyslany/:userEmail/:reset"
            element={<EmailSent />}
          />
          <Route
            path="/resetowanie-hasla/:userId/:resetString"
            element={<PasswordReset />}
          />
          <Route
            path="/aktywacja-konta/:userId/:uniqueString"
            element={<ActivateAccount />}
          />

          <Route path="/o-nas" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/polityka-prywatnosci" element={<Privacy />} />
          <Route path="/mapa-poziomow" element={<LevelMap />} />
          <Route path="/panel-nauczyciela" element={<TeacherPanel />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
