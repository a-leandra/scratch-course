import React from "react";
import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TeacherPanel from "./Features/TeacherPanel";
import LevelMap from "./Features/LevelMap";
import Profile from "./Features/Profile";
import About from "./Information/About";
import Contact from "./Information/Contact";
import Privacy from "./Information/Privacy";
import { createMemoryHistory } from "history";
import UserManagement from "../contexts/UserManagement";
import MainPage from "./MainPage";

const Routing = () => {
  const history = createMemoryHistory();
  return (
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
  );
};

export default Routing;
