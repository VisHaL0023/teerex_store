import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Checkout from "./Components/Checkout/Checkout";
import Thanks from "./Components/Thanks/Thanks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/checkout" element={<Checkout />}></Route>
        <Route exact path="/thanks" element={<Thanks />}></Route>
      </Routes>
    </div>
  );
}

export default App;
