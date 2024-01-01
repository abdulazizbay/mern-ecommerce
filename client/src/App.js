import { Navigate, Routes, Route, BrowserRouter as Router, useLocation } from "react-router-dom";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { Base } from "./components/Base";
import { DetailProduct } from "./components/detail-product/DetailProduct";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { NotFoundPage } from "./components/not-found-page/NotFoundPage";
import {Cart} from "./components/cart/Cart"
import {ProfilePage} from "./components/profile-page/ProfilePage";
function App() {
    return (
        <Router>
            <MainApp />
        </Router>
    );
}

function MainApp() {
    const location = useLocation();
    const routesWithoutNavbar = ["/auth/login", "/auth/register", "/404","/profile"];

    const isNavbarVisible = !routesWithoutNavbar.includes(location.pathname);

    return (
        <>
            {isNavbarVisible && <Navbar />}
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/" element={<Base />} />
                <Route path="/:productId" element={<DetailProduct />} />
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
            {isNavbarVisible && <Footer />}
        </>
    );
}

export default App;
