import styled from "styled-components";
import bestsellersImg from "../../assets/bestsellerCropped.png"
import bestsellersWomenImg from "../../assets/bestsellersWoman.png"
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Bestsellers = ()=>{
    const [image,setImage] = useState(bestsellersImg)
    const gender = useSelector((state) => Object.values(state.gender)[0]);
    const sizeOptions = ["xs", "s", "m", "l", "xl"]

    useEffect(() => {
        if(gender.length===1 &&  gender.includes("girls")){
            setImage(bestsellersWomenImg)
        }else {
            setImage(bestsellersImg)
        }
    }, [gender]);

    const slideContents = [
        {
            title: "Bestsellers",
            description: "Lorem ipsum dolor sit amet consectetur. Suspendisse vitae tellus vestibulum nulla nunc adipiscing eros. Sapien lobortis hendrerit blandit ultrices nulla id eu nullam.",
        },
        {
            title: "Affordability",
            description: "Lorem ipsum dolor sit amet consectetur. Suspendisse vitae tellus vestibulum nulla nunc adipiscing eros. Sapien lobortis hendrerit blandit ultrices nulla id eu nullam.",
        },
        {
            title: "Good",
            description: "Lorem ipsum dolor sit amet consectetur. Suspendisse vitae tellus vestibulum nulla nunc adipiscing eros. Sapien lobortis hendrerit blandit ultrices nulla id eu nullam.",
        },

    ];

    return(
        <StyledBestsellers>
            <section className="bestsellers-container">
                <main>
                    <Carousel
                        showArrows={true}
                        showThumbs={false}
                        autoPlay={true}
                        infiniteLoop={true}
                        showIndicators={false}
                        centerMode={true}
                        centerSlidePercentage={94}
                        interval={3000}
                        transitionTime={3000}
                    >
                        {slideContents.map((slide, index) => (
                            <div key={index} className="slides">
                                <div className="content">
                                    <p>suit sauna</p>
                                    <h1>{slide.title}</h1>
                                    <div className="description">
                                        <p>{slide.description}</p>
                                    </div>
                                    <div className="size-container">
                                        <div className="size-text"><h2>Размеры</h2></div>
                                        <div className="size-group">
                                            {sizeOptions.map((item, index) => (
                                                <div key={index} className="size-option">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                                <div className="image-container">
                                    <img src={image} alt={`Slide ${index}`} />
                                </div>

                            </div>
                        ))}
                    </Carousel>
                </main>

            </section>
        </StyledBestsellers>
    )
}

const StyledBestsellers = styled.div`
  section {
    height: 708px;
    width: 100%;
    main {
      padding: 125px 0 0 30px;
      gap: 5px;
      .slides {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 1200px;
        height: 708px;
        border: 2px solid #000;
        border-radius: 62px;
        position: relative;
        .content {
          padding: 85px 0 0 120px;
          text-align: left;
          display: flex;
          flex-direction: column;
          p {
            font-size: 16px;
          }
          h1 {
            font-size: 75px;
            padding: 20px 0 35px 0;
          }
          .description {
            max-width: 360px;
            padding-bottom: 50px;
            height: 168px;
            p{
              font-size: 24px;
              line-height: 28.37px;
            }
          }
          .size-container{
            padding-top: 75px;
            h2{
              font-size: 40px;
            }
            .size-group{
              padding-top: 25px;
              font-size: 30px;
              display: flex;
              gap: 5px;
              .size-option{
                width: 80px;
                height: 50px;
                border: 1.5px solid #B8B8B8;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #F2F2F2;
                &:hover{
                  border: 1.5px solid #000000;
                }
              }
            }
          }
        }

        .image-container {
          position: absolute;
          bottom: 0;
          right: 50px;
          img {
            width: 440px;
            height: 498px;
          }
        }
      }
    }
  }
`;

