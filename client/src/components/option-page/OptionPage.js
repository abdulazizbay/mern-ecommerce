import styled from "styled-components";
import womenImg from "../../assets/menHomepage.png";
import menImg from "../../assets/womanhomepage.png";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setGender } from '../../states/state';

export const OptionPage = () => {
    const dispatch = useDispatch();
    const [choice, setChoice] = useState("");
    const handleOption = (value) => {
        if (value === choice) {
            setChoice("");
            dispatch(setGender(""));
        } else {
            setChoice(value);
            dispatch(setGender(value));
        }
    };
    return (
        <StyledOptionPage>
            <section className="option-page-container">
                <div className="content">
                    <div
                        className={`men-img ${choice === "men" ? "active" : ""}`}
                        onMouseEnter={() => handleOption("men")}
                    >
                        <div className="circle">
                            <img src={menImg} alt="Men" />
                            <span>Men's</span>
                        </div>
                    </div>
                    <div
                        className={`woman-img ${choice === "girls" ? "active" : ""}`}
                        onMouseEnter={() => handleOption("girls")}
                    >
                        <div className="circle">
                            <img src={womenImg} alt="Women" />
                            <span>Women's</span>
                        </div>
                    </div>
                </div>
            </section>
        </StyledOptionPage>
    );
};

const StyledOptionPage = styled.div`
  section {
    height: 100vh;
    width: 100%;
    background-color: #1B1E23;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .content {
      display: flex;
      justify-content: space-between;
      gap: 130px;
      .woman-img, .men-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: min(38.80vw, 530px);
        height: min(38.80vw, 530px);
        border-radius: 50%;
        background-color: #373A3E80;
        position: relative;

        .circle {
          width: min(38.80vw, 530px);
          height: min(38.80vw, 530px);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          position: relative;
          transition: all 1000ms;
          img {
            max-width: min(26vw, 500px);
            max-height: min(45vw, 650px);
            margin-top: -124px;
          }&:hover{
             cursor: pointer;
           }
          span {
            position: absolute;
            bottom: 18.7vw;
            font-size: min(4.4vw,64px);
            color: white;
          }
        }
      }
    }
  }
  .active {
    .circle {
      background-color: #C36106;
    }
  }
  @media (max-width: 1100px) {
    section{
      height: 50vh;
      .content {
        gap: 40px;
        .woman-img, .men-img {
          width: 103px;
          height: 180px;
          .circle {
            width: 145px;
            height: 146px
        }
      }
    }
    
  }
`;