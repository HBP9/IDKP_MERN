import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import ScanQR from "./components/ScanQR";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/scan" element={<ScanQR />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
