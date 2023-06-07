import Navbar from "./components/NavBar";
import Main from "./pages/Main";
import Schedule from "./pages/Schedule";
import Events from "./pages/Events";
import AddMovie from "./pages/AddMovie";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feedback from "./pages/Feedback";
import AddEvent from "./pages/AddEvent";
import Footer from "./components/Footer";
import PurchaseTicket from "./components/PurchaseTicket";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/AddMovie" element={<AddMovie />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/PurchaseTicket" element={<PurchaseTicket />} />
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
