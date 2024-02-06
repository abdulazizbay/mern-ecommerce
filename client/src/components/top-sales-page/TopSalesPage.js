import styled from "styled-components";
import {IoIosArrowBack as LeftArrow, IoIosArrowForward as RightArrow} from "react-icons/io";
import { useSelector } from 'react-redux';
import { useHttp } from "../../hooks/authHook";
import { useEffect, useState } from "react";
import { CustomButton} from "../buttons/Button";
import {useAuth} from "../../hooks/inUpHook";
import { useDispatch } from 'react-redux';
import {setCartQty} from '../../states/state';
import {CustomToast} from "../custom-toast/CustomToast"
import { useNavigate } from 'react-router-dom';
import {LoadingPage} from "../loading-page/LoadingPage";
export const TopSalesPage = () => {
    const { request, wait } = useHttp();
    const auth = useAuth();
    const {ErrorToast ,LoadingToast,SuccessToast} = CustomToast()
    const dispatch = useDispatch()
    const gender = useSelector((state) => Object.values(state.gender)[0]);
    const [products, setProducts] = useState([]);

    const [productsCart,setProductsCart] = useState([])
    const navigate = useNavigate();
    console.log(products)
    const fetchData = async () => {
        try {
            const data = await request("/api/product/client/getallproducts", "POST", { category: gender });
            setProducts(data);
        } catch (error) {
            console.log(error.message)
            ErrorToast("Something went wrong")
        }
    };
    useEffect(() => {
        fetchData();
    }, [gender]);

    const handleAddCart = async (productID) => {
        try {
            const data = await request("/api/cart/addtocart", "POST", {
                productId:productID,
                color:"black",
                size:"xs",
            }, {
                Authorization: `Bearer ${auth.token}`,
            });
            if (data) {
                const cartQty = data.cart.products.reduce((total, product) => total + product.qty, 0);
                dispatch(setCartQty(cartQty));
                const productValues = data.cart.products.map((product) => product.product);
                setProductsCart((prevProductsCart) => [...prevProductsCart, ...productValues]);
                SuccessToast("Product added to cart successfully");
            } else {
                console.log("Data or products not found in the response.");
                ErrorToast("Failed to add product to cart");
            }
        } catch (error) {
            console.log(error.message)
            ErrorToast(error.message);
        }
    };
    const handleDetail = (productId) => {
        const clickedProduct = products.find(product => product._id === productId);

        if (clickedProduct) {
            navigate(`/${productId}`);
        }
    }
    console.log(products)

    return (
        <StyledTopSalesPage gender={gender}>
            <section className="top-sales-container">
                    <h1>Top Sales</h1>
                    <div className="products">
                        {wait ? (
                            <LoadingPage />
                        ) : (
                            products.map((product) => (
                                <div className="product" key={product._id}>
                                    <img src={product.photo} onClick={() => handleDetail(product._id)} />
                                    <div className="gray-box">
                                        <p>{product.price}$</p>
                                    </div>
                                    <div
                                        onClick={() => handleAddCart(product._id)}
                                        className={`add-cart ${productsCart.includes(product._id) ? 'blue-bg' : ''}`}
                                    >
                                        +
                                    </div>
                                </div>
                            )))
                        }
                    </div>


                    <div className="bottom-widgets">
                        <div className="catalog-button">
                            <CustomButton bgcolor="#759BFC" fontcolor="#ffff">Open Catalog</CustomButton>
                        </div>
                        <div className="arrows">
                            <div className="left-arrow">
                                <LeftArrow size={60} color="white"/>
                            </div>
                            <div className="right-arrow">
                                <RightArrow size={60} color="white"/>
                            </div>
                        </div>
                    </div>

            </section>

        </StyledTopSalesPage>
    );
}

const StyledTopSalesPage = styled.div`
  section {
    background-color:  #fff;
    height: 100%;
    width: 100%;
    padding: 100px 113px 0 125px;
      h1 {
        font-size: 64px;
        font-weight: 500;
      }
      .products {
        padding: 50px 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 93px;
        .product {
          width: 230px;
          height: 460px;
          position: relative;
          display: flex;
          justify-content: center;
          img {
            z-index: 2;
            top: 0;
            position: absolute;
            width: 170px;
            height: 404px;
            transition: top 0.5s ease-out, width 0.5s ease-out, height 0.5s ease-out;
            
          }
          &:hover {
            img{
              top: -70px;
              width: 200px;
              height: 476px;
            }
            .add-cart{
              top: 50%; 
              opacity: 1;
            }

          }

          .gray-box {
            width: ${(props) => props.gender.length === 1 ? "195px" : "230px"};
            height: ${(props) => props.gender.length === 1 ? "330px" : "352px"};
            margin-top: 108px;
            border: 1px solid;
            border-radius: 62px;
            
            p {
              font-size: 32px;
              text-align: center;
              padding-top: 298px;
              font-weight: 600;
            }

          }
          .add-cart {
            display: flex;
            position: absolute;
            top: 70%; 
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #838385; 
            color: #fff;
            width: 60px;
            height: 60px;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0; 
            transition: top 0.5s ease-out, opacity 0.5s ease-out;
            z-index: 3;
        }
          .add-cart.blue-bg {
            background-color: blue; 
          }
      }
    }
      .bottom-widgets{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        .arrows{
          display: flex;
          flex-direction: row;
          gap: 20px;
          .left-arrow , .right-arrow{
            width: 80px;
            height: 79px;
            background-color: #BBB9B9;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
  

  }
  @media (max-width: 1400px) {
    section {
      padding: 26px 9px 0 25px;
      h1 {
        font-size: 36px;
      }
      .products {
        padding: 30px 0 60px 0;
        column-gap: 10px;
        row-gap: 40px;

        .product{
          width: 170px;
          height: 338px;
          img{
            width: 125px;
            height: 300px;
            top: 30px;
          }
          .gray-box {
            width: 170px;
            height: 260px;
            border-radius: 45px;
            position: relative;
            overflow: hidden; 

            p {
              font-size: 24px; 
              text-align: center;
              padding-top: 200px; 
              position: absolute;
              bottom: 10px; 
              left: 0;
              right: 0;
            }
          }
        }
      }
      .bottom-widgets {
        .arrows{
          gap: 10px;
          .left-arrow , .right-arrow{
            width: 50px;
            height: 50px;
          }
        }
      }
    }

  }

  @media (max-width: 750px) {
    section {
      padding: 37px 5px 0 15px;
      .products {
        padding-bottom: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        grid-gap: 30px; 

        .product {
          width: 170px;
          height: 338px;
          img{
            width: 100px;
            height: 150px;
            top: 60px;
          }
          .gray-box {
            width: 100px;
            height: 153px;
            border-radius: 25px;
            position: relative;
            overflow: hidden;

            p {
              font-size: 13px;
              text-align: center;
              padding-top: 200px;
              position: absolute;
              bottom: 10px;
              left: 0;
              right: 0;
            }
          }
        }
      }
      .bottom-widgets {
        display: none;
      }
    }
  }

`;



