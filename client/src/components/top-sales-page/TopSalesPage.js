import styled from "styled-components";
import {IoIosArrowBack as LeftArrow, IoIosArrowForward as RightArrow} from "react-icons/io";
import { useSelector } from 'react-redux';
import { useHttp } from "../../hooks/authHook";
import { useEffect, useState } from "react";
import {Button} from "../buttons/Button";
import {useAuth} from "../../hooks/inUpHook";
import { useDispatch } from 'react-redux';
import {setCartQty} from '../../states/state';
import {CustomToast} from "../custom-toast/CustomToast"
import { useNavigate } from 'react-router-dom';
export const TopSalesPage = () => {
    const { request, loading } = useHttp();
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
            const data = await request("/api/cart/addtocart", "POST", [productID], {
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
                <main>
                    <div className="title">
                        <h1>Top Sales</h1>
                    </div>


                    <div className="products">
                        {products.map((product) => (
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
                        ))}
                    </div>

                    <div className="bottom-widgets">
                        <div className="catalog-button">
                            <Button bgcolor="#0047FF" fontcolor="#ffff">Open Catalog</Button>
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

                </main>
            </section>

        </StyledTopSalesPage>
    );
}

const StyledTopSalesPage = styled.div`
  section {
    background-color:  #fff;
    height: 100%;
    width: 100%;
    main {
      padding: 100px 113px 0 125px;
      .title {
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
`;



