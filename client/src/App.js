import {Routes,Route,BrowserRouter as Router} from "react-router-dom"
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import {Base} from "./components/Base";

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/auth/login" element={<Login/>}/>
            <Route path="/auth/register" element={<Register/>}/>
            <Route path="/" element={<Base/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
