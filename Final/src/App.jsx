import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" element={<Inventory />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
