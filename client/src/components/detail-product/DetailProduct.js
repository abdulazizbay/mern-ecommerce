import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/authHook";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import { Button } from "../buttons/Button";
import { AiOutlineHeart } from "react-icons/ai";
import {setCartQty} from "../../states/state";
import {useAuth} from "../../hooks/inUpHook";
import { useDispatch } from 'react-redux';
import {CustomToast} from "../custom-toast/CustomToast";
import {Toaster} from "react-hot-toast";
export const DetailProduct = () => {
    const { productId } = useParams();
    const { request, wait } = useHttp();
    const auth = useAuth();
    const dispatch = useDispatch()
    const {ErrorToast ,LoadingToast,SuccessToast} = CustomToast()

    const sizeOptions = ["xs", "s", "m", "l", "xl"];
    const colorOptions = ["black", "white", "red", "blue"];
    const [productInfo, setProductInfo] = useState({
        review: 0,
        price: 0,
        name: "",
        description: "",
        size: "xs",
        sold: 0,
        photo: "",
    });

    const fetchProductInfo = async () => {
        try {
            const data = await request("/api/product/getallproducts", "POST", {
                productId: productId,
            });
            if (data) {
                const product = Object.values(data)[0];
                setProductInfo({ ...productInfo, ...product });
            }
        } catch (err) {
            new Error(err.message);
        }
    };

    useEffect(() => {
        fetchProductInfo();
    }, []);

    const devidePayment = productInfo.price / 4;
    const paymentDates = [];
    const today = new Date();
    let currentDay = today.getDate();
    let currentMonth = today.getMonth();

    for (let i = 0; i < 4; i++) {
        if (i > 0) {
            currentDay += 14;
            if (currentDay > 30) {
                currentDay -= 30;
                currentMonth++;
            }
        }

        const nextPaymentDate = new Date(today.getFullYear(), currentMonth, currentDay);
        const formattedDate = nextPaymentDate.toLocaleString("ru", {
            day: "numeric",
            month: "long",
        });

        paymentDates.push(formattedDate);
    }

    const handleAddCart = async () => {
        try {
            const data = await request("/api/cart/addtocart", "POST", {
                productId:productId,
                color:"green",
                size:"xl",
            }, {
                Authorization: `Bearer ${auth.token}`,
            });

            if (data) {
                const cartQty = data.cart.products.reduce((total, product) => total + product.qty, 0);
                dispatch(setCartQty(cartQty));
                await SuccessToast("Product added to cart successfully");
            } else {
                console.log("Data or products not found in the response.");
                ErrorToast("Failed to add product to cart");
            }
        } catch (error) {
            ErrorToast(error.message);

        }
    };


    return (
        <StyledDetailProduct>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <section>
                <main>
                    <div className="media-container">
                        {[1, 2, 3, 4].map((index) => (
                            <div className="image-grid" key={index}>
                                <img
                                    src={
                                        productInfo.photo.includes("detail")
                                            ? productInfo.photo.replace("detail/1", "")
                                            : productInfo.photo
                                    }
                                    alt={`Product Image ${index}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="content-container">
                        <div className="name-review-price">
                            <h1>{productInfo.name}</h1>
                            <div className="review-container">
                                <Rate
                                    style={{ color: 'black',fontSize:35 }}
                                    allowHalf
                                    value={productInfo.review}
                                    onChange={() => {
                                        window.alert("You must purchase the product first!");
                                    }}
                                />
                            </div>
                            <h2>${productInfo.price}</h2>
                            <div className="line" />
                        </div>
                        <div className="color-container">
                            <h1>Цвета</h1>
                            <div className="color-group">
                                {colorOptions.map((item, index) => (
                                    <div className="gray-box" key={index}>
                                        <div className={item} />
                                    </div>
                                ))}
                            </div>
                            <div className="line" />
                        </div>
                        <div className="size-container">
                            <h1>Размеры</h1>
                            <div className="size-options">
                                {sizeOptions.map((size) => (
                                    <div key={size}>{size}</div>
                                ))}
                            </div>
                        </div>
                        <div className="cart-wishlist">
                            <Button
                                children="Добавить в карзину"
                                bgcolor="#000000"
                                fontcolor="#FFFFFF"
                                onClick={handleAddCart}
                            />
                            <AiOutlineHeart size={60} />
                        </div>
                        <div className="payment-container">
                            <div className="wrapper">
                                <div className="title">
                                    <h3>4 платежа по {devidePayment.toFixed(2)}$</h3>
                                    <p >без % и переплат</p>
                                </div>
                                <div className="devide-payment">
                                    {paymentDates.map((item, index) => (
                                        <div className="single-payment" key={index}>
                                            <div className="gray-line" />
                                            <div>
                                                <h5>{item}</h5>
                                                <p>{devidePayment.toFixed(2)}$</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p>Плати частями - по 25% каждые две недели.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </StyledDetailProduct>
    );
};

const StyledDetailProduct = styled.div`
  section {
    width: 100%;
    height: 100%;
  }
  main {
    padding: 150px 107px 100px 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 70px;
    .media-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 50px;
      .image-grid {
        background-color: #D9D9D9;
        width: 300px;
        height: 520px;
        display: flex;
        align-items: flex-end;
        border-radius: 15px;
        img {
          width: 300px;
          height: 495px;
        }
      }
    }
    .content-container {
      display: flex;
      flex-direction: column;
      h1 {
        font-size: 48px;
      }
      h2 {
        font-size: 40px;
      }
      .line {
        width: 440px;
        height: 1px;
        background-color: #D9D9D9;
        margin-top: 20px;
      }
      .name-review-price {
        .review-container {
          padding: 5px 0 15px 3px;
        }
      }
      .color-container {
        padding: 20px 0 0 0;
        .color-group {
          display: flex;
          flex-direction: row;
          gap: 20px;
          padding-top: 53px;
        }
        .gray-box {
          width: 73px;
          height: 100px;
          border-radius: 15px;
          background-color: #D9D9D9;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 54px;
            height: 70px;
            border-radius: 10px;
          }&:hover{
             background-color: white;
              border: 1px solid #000;
           }
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
        .line {
          margin-top: 50px;
        }
      }
      .size-container {
        padding: 25px 0 75px 0;
        .size-options {
          display: flex;
          flex-direction: row;
          margin-top: 20px;
          gap: 5px;
          div {
            width: 100px;
            height: 62px;
            font-size: 32px;
            border: 1.5px solid #B8B8B8;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
        }
      }
      .cart-wishlist {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        button {
          font-size: 38px;
          width: 382px;
          height: 67px;
          border-radius: 10px;
        }
      }
      .payment-container {
        margin-top: 75px;
        width: 510px;
        height: 220px;
        background-color: #D9D9D9;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .wrapper {
          padding: 20px 0 0 25px;

          h3 {
            font-size: 32px;
          }

          p {
            font-size: 16px;
            padding: 7px 0 25px 0;
          }

          .devide-payment {
            display: flex;
            flex-direction: row;
            gap: 20px;

            h5 {
              padding: 6px 0 2px 0;
              font-size: 16px;
              color: #767676;
              text-align: center;
            }
            p{
              text-align: center;
            }
            .gray-line {
              width: 100px;
              background-color: #938D8D;
              height: 5px;
              margin: auto; 
            }
          }
        }
      }

    }
  }
`;
