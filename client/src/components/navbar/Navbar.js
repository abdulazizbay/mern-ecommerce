import styled from "styled-components";
import heartIMG from "../..//assets/iconoir_heart.png"
import cartIMG from "../..//assets/Vector.png"
import logoIMG from "../../assets/sportClousLogo.png"
import {PiUserCircleBold} from "react-icons/pi";
import {AiOutlineHeart} from "react-icons/ai";
import "./searchButton.css"
import { useSelector } from 'react-redux';

export const Navbar = ()=>{
    const cartQty = useSelector((state) => Object.values(state.cartQty)[0]);
    console.log(cartQty)
    return(
        <StyledNavbar>
            <section className="navbar-container">
                <nav className="navbar">

                    <div className="logo">
                        <img src={logoIMG}/>
                    </div>
                    <div className="options">
                        <ul>
                            <li>Box</li>
                            <li>Run</li>
                            <li>Fitness</li>
                            <li>Sales</li>

                        </ul>
                    </div>
                    <div className="cart-search-wishlist">

                        <div className="search-cont">
                            <input className="search__input" type="text" placeholder="Search"/>
                        </div>
                        <div className="user-image">
                            <PiUserCircleBold size={21}/>
                        </div>
                        <div className="wishlist">
                            <AiOutlineHeart size={24}/>
                        </div>
                        <div className="cart">
                            <img src={cartIMG}/>
                        </div>
                        <div>
                            {cartQty}
                        </div>

                    </div>
                </nav>
            </section>

        </StyledNavbar>
    )
}

const StyledNavbar = styled.div`

    section{
      position: fixed;
      width: 100%;
      height: 104px;
      z-index: 999;
      nav{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #FFFFFF;
        padding: 0 120px;
        .logo{
          width: 72px;
          padding-top: 44px;
        }
        .options{
          ul{
            display: flex;
            flex-direction: row;
            gap: 53px;
            opacity: 50%;
            padding: 55px 0 0 334px;
            font-size: 18px;
            font-weight: 500;
          }
        }
        .cart-search-wishlist{
          justify-content: flex-end;
          display: flex;
          flex-direction: row;
          gap: 25px;
          .user-image{
            padding-top: 55px;

          }
          
          .search-cont{
            padding: 52px 0 0 0 ;
          }
          .wishlist{
            padding: 54px 0 0 0 ;
            img{
              width: 24px;
              height: 24px;
            }
          }
          .cart{
            margin-top: 54px   ;
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
      }
    }
`