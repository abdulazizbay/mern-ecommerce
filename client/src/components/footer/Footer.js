import styled from "styled-components";
import logoIMG from "../../assets/sportClousLogo.png";
import fc from "../../assets/facebook.png"
import inst from "../../assets/instagram.png"
import tch from "../../assets/twitch.png"
import ggl from "../../assets/google.svg"
import visaImg from "../../assets/visapay.png"
import unionImg from "../../assets/unionpay.png"
import masterImg from "../../assets/mastercard.png"
export const Footer = () => {
    const topOptions = ["Box", "Run", "Fitness", "Sales"];
    const bottomOptions = ["T-shirts", "Costumes", "Shoes", "Other"];
    const socialMedia = [fc,inst,tch,ggl,]
    return (
        <StyledFooter>
            <section className="footer-container">
                <footer>
                    <div className="logo">
                        <img src={logoIMG} alt="Logo" />
                    </div>
                    <div className="options">
                        <div className="content">
                            <div className="top-options">
                                {topOptions.map((option) => (
                                    <div className="option-group" key={option}>
                                        <div className="option">{option}</div>
                                        <div className="sub-options">
                                            {bottomOptions.map((subOption) => (
                                                <div className="sub-option" key={subOption}>{subOption}</div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="payment-options">
                                <img src={masterImg}/>
                                <img src={visaImg}/>
                                <img src={unionImg}/>
                            </div>
                        </div>


                        <div className="option-social-media">
                            <div className="bottom-options-group">
                                <ul>
                                    {topOptions.map((option) => {
                                        return <li key={option}>{option}</li>
                                    })}
                                </ul>
                            </div>

                            <div className="social-media">
                                <ul>
                                    {socialMedia.map((item)=>{
                                        return <li key={item} ><img src={item}/></li>
                                    })}
                                </ul>

                            </div>
                        </div>

                    </div>

                </footer>
            </section>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
    section{
      width: 100%;
      height: 293px;
      background-color: #1B1E23;

      footer{
        padding: 50px 120px 25px 50px;
        display: flex;
        flex-direction: row;
        color: #ffffff;
        font-weight: 300;
        font-family: 'Inter', Arial, sans-serif;

        .logo{
          position: relative;
          img{
            position: absolute;
            bottom: 0;
          }
        }
        .options {
          padding-left: 170px;
          .content{
            display: flex;
            gap: 70px;
            .top-options {
              display: flex;
              gap: 150px;

              .option-group {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .option {
                  font-size: 24px;
                }

                .sub-options {
                  display: flex;
                  flex-direction: column;
                  gap: 5px;

                  .sub-option {
                    font-size: 18px;
                    opacity: 0.6;
                  }
                }
              }
          }
            .payment-options{
              display: flex;
              gap: 10px;

              img{
                width: 100px;
                height: 60px;
              }
            }
          }

          .option-social-media{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 28px 0 0 237px;
            .bottom-options-group{
              ul{
                display: flex;
                flex-direction: row;
                gap: 90px;
                opacity: 0.6;
                font-weight: 500;
                font-size: 24px;
              }
            }
            .social-media{
              padding-left: 140px;
              ul{
                display: flex;
                flex-direction: row;
                gap: 15px;
              }
            }
          }
        }
      }
    }
  
`;
