import styled from "styled-components"



export const Button = ({bgcolor,fontcolor,children})=>{
    return (
        <StyledButtons bgcolor={bgcolor} fontcolor={fontcolor} >
            {children}
        </StyledButtons>
    )
}

const StyledButtons = styled.button`
        width: 375px ;
        height: 80px;
        background-color: ${props=>props.bgcolor};
        color: ${props=>props.fontcolor};
        border: none;
        border-radius: 100px;
        font-size: 48px;
        font-weight: 500;
        cursor: pointer;
`