import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

export const LoadingPage= ()=> {
    return (
        <StyleLoadingPage>
            <ReactLoading
                type="spinningBubbles"
                color="#0000FF"
                height={300}
                width={300}
            />
        </StyleLoadingPage>
    );
}
const StyleLoadingPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`