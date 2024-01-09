import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import ScanQR from "./components/ScanQR";
import Dashboard from "./components/Dashboard";
import EditMenu from "./components/EditMenu";
import EditTable from "./components/EditTable";
import Orders from "./components/Orders";
import FoodMenu from "./components/FoodMenu";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/scan" element={<ScanQR />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/editMenu" element={<EditMenu />} />
          <Route exact path="/editTable" element={<EditTable />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route
            exact
            path="/getMenu/:tableName/:adminId"
            element={<FoodMenu />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
