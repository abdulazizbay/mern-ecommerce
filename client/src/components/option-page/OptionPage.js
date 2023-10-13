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
                <main>
                    <div
                        className={`men-img ${choice === "men" ? "active" : ""}`}
                        onClick={() => handleOption("men")}
                    >
                        <div className="circle">
                            <img src={menImg} alt="Men" />
                            <span>Men's</span>
                        </div>
                    </div>
                    <div
                        className={`woman-img ${choice === "girls" ? "active" : ""}`}
                        onClick={() => handleOption("girls")}
                    >
                        <div className="circle">
                            <img src={womenImg} alt="Women" />
                            <span>Women's</span>
                        </div>
                    </div>
                </main>
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
    main {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 120px;

      .woman-img, .men-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 530px;
        height: 530px;
        border-radius: 50%;
        background-color: #373A3E80;
        position: relative;

        .circle {
          width: 530px;
          height: 530px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          position: relative;
          transition: all 1000ms;
          img {
            max-width: 377px;
            max-height: 650px;
            margin-top: -124px;
          }

          span {
            position: absolute;
            bottom: 270px;
            font-size: 64px;
            color: white;
          }
        }
      }

      .woman-img {
        margin-left: 130px;
      }
    }
  }

  .active {
    .circle {
      background-color: #C36106;
    }
  }
`;