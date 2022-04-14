import React from "react";
import styled, { keyframes } from "styled-components";
import Loader from "@svg/Loader";
type SecondaryButtonProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  loading,
  disabled,
}) => {
  return (
    <Wrapper disabled={disabled != undefined ? disabled : false}>
      {disabled ? <ButtonCover /> : null}
      {loading ? (
        <LoadingWrapper>
          <Loader />
        </LoadingWrapper>
      ) : (
        <Title>{title}</Title>
      )}
    </Wrapper>
  );
};

const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 16px;
  line-height: 18px;
  color: #fc5842;
`;
const Wrapper = styled.div`
  position: relative;
  background: #ffffff;
  padding: 20px 24px 20px 24px;
  box-shadow: 0px 10px 28px rgba(252, 88, 66, 0.2);
  border-radius: 4px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  min-width: 105px;
  pointer-events: ${({ disabled }: { disabled: boolean }) => {
    return disabled ? "none" : "auto";
  }};
  cursor: default;
  &:hover {
    background: #fbfbfb;
    box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
    transform: scale(1.03);
  }
  &:hover ${Title} {
    color: #dc2b2b;
  }
  &:active {
    box-shadow: 0px 4px 8px rgba(darken(dodgerblue, 30%));
    transform: scale(0.98);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 2s linear infinite;
`;
const ButtonCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #2e2e2e83;
  left: 0;
  top: 0;
  border-radius: 4px;
`;
export default SecondaryButton;
