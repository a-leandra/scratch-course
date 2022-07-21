import Navbar from "./components/Navbar";
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
      <div className="container">
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