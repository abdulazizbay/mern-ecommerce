import {Navbar} from "./navbar/Navbar";
import {OptionPage} from "./option-page/OptionPage";
import {TopSalesPage} from "./top-sales-page/TopSalesPage";
import {Bestsellers} from "./bestsellers/Bestsellers";
import {SalesPage} from "./sales-page/SalesPage";
import {Footer} from "./footer/Footer";
import {Toaster} from "react-hot-toast";
export const Base = () =>{
    return (
        <>
            <Navbar/>
            <OptionPage/>
            <TopSalesPage/>
            <Bestsellers/>
            <SalesPage/>
            <Footer/>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}

