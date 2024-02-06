import styled from "styled-components";

export const CustomButton = ({ bgcolor, fontcolor, children, onClick }) => {
    const handleClick = () => {

        if (onClick) {
            onClick();
        }
    };

    return (
        <StyledButtons bgcolor={bgcolor} fontcolor={fontcolor} onClick={handleClick}>
            {children}
        </StyledButtons>
    );
};

const StyledButtons = styled.button`
  width: 375px;
  height: 80px;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.fontcolor};
  border: none;
  border-radius: 100px;
  font-size: 48px;
  font-weight: 500;
  cursor: pointer;
  @media (max-width: 1400px) {
    width: 227px;
    height: 50px;
    font-size: 24px;
  }
`;
