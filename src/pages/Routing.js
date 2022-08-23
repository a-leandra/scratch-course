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
import UserManagement from "../UserManagement";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../reducers/index";

const store = configureStore({
  reducer: reducers,
});

const Routing = () => {
  const history = createMemoryHistory({ reducer: {} });
  return (
    <BrowserRouter location={history.location} navigator={history}>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/panel-nauczyciela" />} />
          <Route path="/panel-nauczyciela" element={<TeacherPanel />} />
          <Route path="/mapa-poziomow" element={<LevelMap />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/polityka-prywatnosci" element={<Privacy />} />
          <Route path="/zaloguj" element={<UserManagement />} />
        </Routes>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
};

export default Routing;
