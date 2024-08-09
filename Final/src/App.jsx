import Dashboard from "./Dashboard";
import Historys from "./History";

import Inventory from "./Inventory";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" element={<Inventory />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/History" element={<Historys/>} />
        
          
        </Routes>
      </div>
    </>
  );
}

export default App;
