import React from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherPanel from "./pages/NavigationBar/TeacherPanel";
import LevelMap from "./pages/NavigationBar/LevelMap";
import Profile from "./pages/NavigationBar/Profile";
import About from "./pages/Footer/About";
import Contact from "./pages/Footer/Contact";
import Privacy from "./pages/Footer/Privacy";
import { createMemoryHistory } from "history";
import "./index.css";

const App = () => {
  const history = createMemoryHistory();
  return (
    <div className="App">
      <BrowserRouter location={history.location} navigator={history}>
        <NavigationBar />
        <Routes>
          <Route path="/panel-nauczyciela" element={<TeacherPanel />} />
          <Route path="/mapa-poziomow" element={<LevelMap />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/polityka-prywatnosci" element={<Privacy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
