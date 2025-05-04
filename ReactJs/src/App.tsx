import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Selected } from "./pages/Selected";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/selected" element={<Selected />} />
      </Routes>
    </Router>
  );
}

export default App;
