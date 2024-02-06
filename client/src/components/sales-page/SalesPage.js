import styled from "styled-components";
import menSalesImg from "../../assets/croppedexMenSale.png";
import womenSalesImg from "../../assets/womenSalesImg.png";
import menzoomedIMG from "../../assets/zoomedimage.png";
import womenZoomedIMG from "../../assets/zoomedWomenSales.png";
import uniSalesIMG from "../../assets/universalSale.png";
import uniZoomedIMG from "../../assets/uniZoomed.png";
import { CustomButton} from "../buttons/Button";
import { IoIosArrowBack as LeftArrow, IoIosArrowForward as RightArrow } from "react-icons/io";
import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
export const SalesPage = () => {
    const gender = useSelector((state) => Object.values(state.gender)[0]);
    console.log(gender)
    const currentyear = new Date().getFullYear();

    const [mainImage, setMainImage] = useState(uniSalesIMG);
    const [zoomedImage, setZoomedImage] = useState(uniZoomedIMG);

    useEffect(() => {
        if (gender.includes("men") && gender.includes("girls")) {
            setMainImage(uniSalesIMG);
            setZoomedImage(uniZoomedIMG);
        } else if (gender.includes("men")) {
            setMainImage(menSalesImg);
            setZoomedImage(menzoomedIMG);
        } else if (gender.includes("girls")) {
            setMainImage(womenSalesImg);
            setZoomedImage(womenZoomedIMG);
        } else {
            setMainImage(uniSalesIMG);
            setZoomedImage(uniZoomedIMG);
        }
    }, [gender]);
    return (
        <StyledSalesPage>
            <section className="sales-page-container">
                <div className="blank-space"></div>
                <main>
                    <div className="big-image">
                        <img src={mainImage} alt="Sales Image" />
                    </div>
                    <div className="content">
                        <div className="text">
                            <h1>Exclusive</h1>
                            <h2>sale</h2>
                        </div>
                        <div className="edition-time">
                            <p>Limited edition</p>
                            <h1>{currentyear}</h1>
                        </div>
                        <div className="zoomed-image">
                            <img src={zoomedImage} alt="Zoomed Image" />
                            <div className="button">
                                <CustomButton bgcolor="#0047FF" fontcolor="#fff">
                                    Open Catalog
                                </CustomButton>
                            </div>
                        </div>
                        <div className="page-changer">
                            <div className="arrows">
                                <div className="left-arrow">
                                    <LeftArrow size={60} />
                                </div>
                                <div className="right-arrow">
                                    <RightArrow size={60} />
                                </div>
                            </div>
                            <div className="page-number">
                                <h1>1/10</h1>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </StyledSalesPage>
    );
};

const StyledSalesPage = styled.div`
  section{
    background-color: #fff;
    height: 1025px;
    width: 100%;
    .blank-space{
      background-color: #fff;
      height: 170px;
    }

    main{
      background-color: #EEECF4;
      padding: 0 120px ;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .big-image{
        padding-top: 55px ;
        img{
          width: 355px;
          height: 800px;
        }
      }
      .content{
        width: 692px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .text{
          width: 290px;
          line-height: 46px;
          padding-top: 15px;
          h1,h2{
            font-size: 64px;
          }
          h2{
            float: right;
          }
        }
        .edition-time{
          padding-top: 77px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          p{
            font-size: 18px;
            padding-top: 60px;
          }
          h1{
            font-size: 96px;
          }
        }
        .zoomed-image{
          position: relative;
          .button{
            position: absolute;
            transform: translate(10%,-50%);
            rotate: 5deg;
            button{
              width: 560px;
              height: 87px;
              box-shadow: 5px 20px 47px 0px #0047FF;

            }
          }
        }
        .page-changer{
          padding: 200px 0 10px 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .arrows{
            display: flex;
            flex-direction: row;
            gap: 20px;
            .left-arrow , .right-arrow{
              width: 80px;
              height: 76px;
              background-color: #D9D9D9;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
          .page-number{
            font-size: 75px;
          }
        }
      }
      
    }
  }
  @media (max-width: 1400px) {
    section{
        display: none;
    }
    
  }
`