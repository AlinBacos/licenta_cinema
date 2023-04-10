import Navbar from "./components/NavBar"
import Main from "./pages/Main"
import Schedule from "./pages/Schedule"
import About from "./pages/About"
import RedeemTicket from "./pages/RedeemTicket"
import AddMovie from "./pages/AddMovie"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/About" element={<About />} />
        <Route path="/RedeemTicket" element={<RedeemTicket />} />
        <Route path="/AddMovie" element={<AddMovie />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App;
