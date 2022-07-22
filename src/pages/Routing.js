import React from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TeacherPanel from "./Utilities/TeacherPanel";
import LevelMap from "./Utilities/LevelMap";
import Profile from "./Utilities/Profile";
import About from "./Information/About";
import Contact from "./Information/Contact";
import Privacy from "./Information/Privacy";
import { createMemoryHistory } from "history";

const Routing = () => {
  const history = createMemoryHistory();
  return (
    <BrowserRouter location={history.location} navigator={history}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="/panel-nauczyciela" />} />
        <Route path="/panel-nauczyciela" element={<TeacherPanel />} />
        <Route path="/mapa-poziomow" element={<LevelMap />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/o-nas" element={<About />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/polityka-prywatnosci" element={<Privacy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
