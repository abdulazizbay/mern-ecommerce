import styled from "styled-components";
import {IoIosArrowBack as LeftArrow, IoIosArrowForward as RightArrow} from "react-icons/io";
import bestsellersImg from "../../assets/bestsellerCropped.png"
import bestsellersWomenImg from "../../assets/bestsellersWoman.png"
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
export const Bestsellers = ()=>{
    const [image,setImage] = useState(bestsellersImg)
    const gender = useSelector((state) => Object.values(state.gender)[0]);

    useEffect(() => {
        if(gender.length===1 &&  gender.includes("girls")){
            setImage(bestsellersWomenImg)
        }else {
            setImage(bestsellersImg)
        }
    }, [gender]);

    return(
        <StyledBestsellers>
            <section className="bestsellers-container">
                <main>
                    <div className="content">
                        <p>suit sauna</p>
                        <h1>Bestsellers</h1>
                        <div className="description">
                            <p>Lorem ipsum dolor sit amet
                                consectetur. Suspendisse
                                vitae tellus vestibulum nulla
                                nunc adipiscing eros. Sapien
                                lobortis hendrerit blandit
                                ultrices nulla id eu nullam.</p>
                        </div>
                            <div className="arrows">
                                <div className="left-arrow">
                                    <LeftArrow size={60} color="white"/>
                                </div>
                                <div className="right-arrow">
                                    <RightArrow size={60} color="white"/>
                                </div>
                            </div>
                            <div className="page-number">1/10</div>
                    </div>
                    <div className="image-container">
                        <img src={image}/>
                    </div>
                </main>

            </section>
        </StyledBestsellers>
    )
}

const StyledBestsellers = styled.div`
  section{
    height: 708px;
    width: 100%;
    background-color: #B5B2B2;
    main {
      padding: 80px 30px 0 115px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .content {
        p {
          font-size: 16px;
        }
        h1{
          font-size: 75px;
          padding: 10px 0 35px 0 ;
        }
        .description {
          max-width: 360px;
          padding-bottom: 50px;
          height: 168px;
          line-height: 28.37px;
        }
        .arrows{
          display: flex;
          flex-direction: row;
          gap: 20px;
          .left-arrow , .right-arrow{
            width: 80px;
            height: 76px;
            background-color: #BBB9B9;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
        .page-number{
          font-size: 75px;
          float: right;
          font-weight: 600;
          padding-left: 355px;
        }
        

      }
      
    }
    .image-container{
      
      img{
        width: 560px;
        height: 627px;
      }
    }
  }
`