import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Navbar3 from "./components/Navbar3";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Classroom from "./pages/Classroom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar/>
      <div className="container text-center">Menu dla niezalogowanego użytkownika</div>
      <br/>
      <Navbar2/>
      <div className="container text-center">Menu dla zalogowanego użytkownika (nauczyciel)</div>
      <br/>
      <Navbar3/>
      <div className="container text-center">Menu dla zalogowanego użytkownika (uczeń)</div>
      <br/>
      <div className="container text-center">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/classroom" element={<Classroom/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </div>     
    </>    
  )
}

export default App