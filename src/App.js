import React from "react";
import "./index.css";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TeacherPanel from "./pages/Features/TeacherPanel";
import LevelMap from "./pages/Features/LevelMap";
import Profile from "./pages/Features/Profile";
import About from "./pages/Information/About";
import Contact from "./pages/Information/Contact";
import Privacy from "./pages/Information/Privacy";
import { createMemoryHistory } from "history";
import UserManagement from "./UserManagement";
import MainPage from "./pages/Information/MainPage";

const App = () => {
  const history = createMemoryHistory({ reducer: {} });
  return (
    <div className="App">
      <BrowserRouter location={history.location} navigator={history}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/mapa-poziomow" />} />
          <Route path="/panel-nauczyciela" element={<TeacherPanel />} />
          <Route path="/mapa-poziomow" element={<LevelMap />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/polityka-prywatnosci" element={<Privacy />} />
          <Route path="/zaloguj" element={<UserManagement />} />
          <Route path="/glowna" element={<MainPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
