import { useHttp } from "../../hooks/authHook";
import { useAuth } from "../../hooks/inUpHook";
import { useEffect, useState } from "react";
import styled from "styled-components";
import masterCardImg from "../../assets/mastercard.png"
import unionImg from "../../assets/unionpay.png"
import visaImg from "../../assets/visapay.png"
import {LoadingPage} from "../loading-page/LoadingPage";

export const Cart = () => {
    const { request, error,wait } = useHttp();
    const auth = useAuth();
    const [cartData, setCartData] = useState([]);
    const sizeOptions = ["xs", "s", "m", "l", "xl"];
    const colorOptions = ["black", "white", "red", "blue"];
    const paymentCards = [masterCardImg,unionImg,visaImg]
    const [totalBill, setTotalBill] = useState(0);
    const getData = async () => {
        try {
            const data = await request("/api/cart/getcart", "GET", null, {
                Authorization: `Bearer ${auth.token}`,
            });
            console.log(data)
            if (data && data.cartData ) {
                setCartData(data.cartData);
                const bill = data.cartData.reduce((total, item) => total + item.product.price, 0);
                setTotalBill(bill);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (auth.token) {
            getData();
        }
    }, [auth.token]);

    return (
        <StyledCart>
            {wait?<LoadingPage/>:
            <section className="cart-container">
                <main>
                    <div className="content">
                    <div className="product-info">
                        {cartData.map((item, index) => (
                            <div key={index} className="product-item">
                                <div className="photo-container">
                                    <img src={item.product.photo} alt={item.product.name} />
                                </div>
                                <div className="attributes-container">
                                    <div className="name-desc">
                                        <h2>{item.product.name}</h2>
                                        <p>{item.product.description}</p>
                                    </div>
                                    <div className="color-size">
                                        <div className="color-container">
                                            <h2>Цвет</h2>
                                            <div className="color-group">
                                                {colorOptions.map((col, index) => (
                                                    <div
                                                        className={`gray-box ${item.cartItem.color === col ? 'selected' : ''}`}
                                                        key={index}
                                                    >
                                                        <div className={col}></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="size-container">
                                            <h2>Размеры</h2>
                                            <div className="size-options">
                                                {sizeOptions.map((size) => (
                                                    <div
                                                        className={`size-box ${item.cartItem.size === size ? 'selected' : ''}`}
                                                        key={size}
                                                    >
                                                        <p>{size}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                        <div className="vertical-line"></div>
                    </div>

                    <div className="price-payment">
                        <div className="price-group">
                            {cartData.map((item, index) => (
                                <div className="price-item">
                                    <h2>{item.product.name}</h2>
                                    <h4>${item.product.price}</h4>
                                </div>
                            ))}
                        </div>
                        <div className="horizontal-line"></div>
                        <div className="payment-container">
                            <div className="bill">
                                <h1>${totalBill}</h1>
                            </div>
                            <div className="cards-group">
                                {paymentCards.map((card)=>(
                                    <div>
                                        <img src={card}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

            </section>
            }
        </StyledCart>
    );
};

const StyledCart = styled.div`
  section {
    width: 100%;
    background-color: #fff;
    h2 {
      font-size: 40px;
    }
    p {
      font-size: 20px;
    }
    main {
      padding: 159px 28px 70px 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 28px;
      .content{
        display: flex;
        gap: 40px;
      .product-info {
        display: flex;
        flex-direction: column;
        gap: 50px;
        .product-item {
          display: flex;
          gap: 60px;
          .photo-container {
            img {
              width: 100px;
              height: 270px;
            }
          }
          .attributes-container {
            .name-desc {
              p {
                padding-top: 15px;
              }
            }
            .color-size{
              padding: 33px 0 0 0;
              display: flex;
              gap: 105px;
              .color-container{
              .color-group {
                display: flex;
                flex-direction: row;
                gap: 10px;
                padding-top: 30px;
              }
              .gray-box {
                width: 36px;
                height: 50px;
                border-radius: 8px;
                background-color: #D9D9D9;
                display: flex;
                justify-content: center;
                align-items: center;
                div{
                  width: 27px;
                  height: 35px;
                }
              }
                .selected {
                  background-color: white;
                  border: 1px solid #000;
                }
              .red {
                background-color: #FF0000;
              }

              .blue {
                background-color: #0500FF;
              }
              .black {
                background-color: black;
              }

              .white {
                background-color: #fff;
              }

            } 

              .size-container{
                .size-options{
                  display: flex;
                  gap: 5px;
                  padding-top: 30px;
                  .size-box{
                    width: 75px;
                    height: 50px;
                    border: 1px solid #000;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    p{
                      font-size: 24px;
                    }
                  }
                  .selected {
                    background-color: #575756;
                    border: 1px solid #000;
                  }
                }
            }
            } 
          } 
        } 
      }
        .vertical-line{
          height: 100%;
          width: 1px;
          background-color: #000;
        }
      }
      .horizontal-line {
        margin: 100px 42px 79px 0;
        width: 100%;
        height: 1px;
        background-color: black;
      }
      .price-payment {
        .price-group{
          display: flex;
          flex-direction: column;
          gap: 100px;
          .price-item{
            display: flex;
            gap: 31px;
            h4{
              font-size: 36px;
            }
          }
        }
        .payment-container{
          display: flex;
          align-items: center;
          flex-direction: column;
          .bill{
            width: 300px;
            height: 100px;
            background-color: #000;
            color: #fff;
            font-size: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
          }
          .cards-group{
            padding-top: 101px;
            display: flex;
            //gap: 40px;
          }
        }
      }
    }
  }
`;
