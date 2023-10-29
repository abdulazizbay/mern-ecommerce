import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { Base } from "./components/Base";
import { DetailProduct } from "./components/detail-product/DetailProduct";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";

function App() {
    const routesWithoutNavbar = ["/auth/login", "/auth/register"];

    const isNavbarVisible = !routesWithoutNavbar.includes(window.location.pathname);

    return (
        <Router>
            {isNavbarVisible && <Navbar />}
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/" element={<Base />} />
                <Route path="/:productId" element={<DetailProduct />} />
            </Routes>
            {isNavbarVisible && <Footer />}
        </Router>
    );
}

export default App;
