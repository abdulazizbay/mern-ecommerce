import styled from "styled-components";
import cartIMG from "../..//assets/Vector.png"
import logoIMG from "../../assets/sportClousLogo.png"
import {PiUserCircleBold} from "react-icons/pi";
import {AiOutlineHeart} from "react-icons/ai";
import logoImgBlack from "../../assets/logoBlack.png"
import "./searchButton.css"
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { IoMenu } from "react-icons/io5";

export const Navbar = ()=>{
    const cartQty = useSelector((state) => Object.values(state.cartQty)[0]);
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const navigate = useNavigate()
    return(
        <StyledNavbar isHomePage={isHomePage}>
            <header className="header">
                <a
                    href="/"
                    className="header-logo"
                >
                    {isHomePage?
                        <img src={logoIMG}/>
                        :
                        <img src={logoImgBlack}/>
                    }

                </a>
                <nav className="header-menu">
                    <ul>
                        <li>BOX</li>
                        <li>RUN</li>
                        <li>FITNESS</li>
                        <li>SALES</li>
                    </ul>
                </nav>
                <div className="header-search">
                    <input className="search__input" type="text" placeholder="Search"/>
                </div>
                <div className="header-actions">
                    <span
                        className="user-image"
                        onClick={()=>{navigate("/profile")}}
                    >
                        <PiUserCircleBold size={21}/>
                    </span>
                    <span className="wishlist">
                        <AiOutlineHeart size={24}/>
                    </span>
                    <span
                        className="cart"
                        onClick={()=>{navigate("/cart")}}
                    >
                        <img src={cartIMG}/>
                    </span>
                    <span>
                        {cartQty}
                    </span>

                </div>
                <div className="burger">
                    <IoMenu/>
                </div>
            </header>

        </StyledNavbar>
    )
}

const StyledNavbar = styled.div`
  header{
    .burger{
      display: none;
    }
    position: fixed;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    color: ${(props) => (props.isHomePage ? "#fff" : "#000")};
    padding-inline: 45px 100px;
    width: 100%;
    a{
      margin-top: 33px;
      margin-right: 20%;
    }
    nav{
      margin-top: 55px;
      ul{
        display: flex;
        column-gap: 35px;
        font-size: 20px;
        li{
          align-items: center;
          display: flex;
        }
      }
    }
    .header-search{
      margin-top: 52px;
    }
    .header-actions{
      display: flex;
      gap: 25px;
      margin-top: 54px;
      .cart{
         border-radius: 30px ;
         height: 24px;
         width: 24px;
         background-color: #24242E;
         display: flex;
         justify-content: center;
         align-items: center;
         img{
             width: 8px;
             height: 10px;
         }
      }
    }
    @media(max-width: 1300px){
      .header-actions{
        display: none;
      }
      gap: 5px;
      padding-inline: 10px 15px;
      a{
        margin-top: 10px;
        margin-right: 5%;
      }
      img{
        width: 40px;
        height: 24px;
      }
      nav{
        margin-top: 18px;
        ul{
          column-gap: 15px;
          font-size: 7px;
          li{
            align-items: center;
            display: flex;
          }
        }
      }
      .header-search{
        margin-top: 10px;
      }

      .burger{
        display: flex;
        margin-top: 15px;
        width: 12px;
        height: 12px;
        background-color: white;
        color: #000;
        align-items: center;
        border-radius: 2px
      }
    }
  }

`

