import styled from "styled-components";
import bgimg from "../../assets/notfoundBg.png";

export const NotFoundPage = () => {
    console.log("Not Found");
    return (
        <StyledNotFoundPage bgIMG={bgimg}>
            <section className="not-found-container">
                <main>
                    <div className="number-container">
                        <h1>404</h1>
                    </div>
                    <div className="text-container">
                        <h2>Not Found</h2>
                    </div>
                </main>
            </section>
        </StyledNotFoundPage>
    );
}

const StyledNotFoundPage = styled.div`
  section {
    background: center/cover url(${props => props.bgIMG}) no-repeat;
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    main {
      text-align: center;
      .number-container {
        font-size: 500px;
        background: linear-gradient(to top, transparent 8%, white);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: blurAnimation 5s ease-in-out ;
      }
      .text-container {
        font-size: 96px;
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        text-align: center;
        overflow: hidden;
        background: linear-gradient(to top, transparent 5%, white);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: blurAnimation 5s ease-in-out;
      }
      @keyframes blurAnimation {
        0% { opacity: 0 }
        25% { opacity: 0.25 }
        50% { opacity: 0.5 }
        75% { opacity: 0.75 }
        100% { opacity: 1 }
      }
    }
  }
`;
