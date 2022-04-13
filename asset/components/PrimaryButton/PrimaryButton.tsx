import React from "react";
import styled, { keyframes } from "styled-components";
import Loader from "@svg/Loader";
type PrimaryButtonProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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

const Wrapper = styled.div`
  position: relative;
  background: #fc5842;
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
    background: #dc2b2b;
    box-shadow: 0px 10px 28px rgba(252, 88, 66, 0.2);
  }
  &:focus {
    background: #fc5842;
    box-shadow: 0px 10px 28px rgba(252, 88, 66, 0.2);
  }
  &:active {
    background: #fc5842;
    box-shadow: 0px 10px 28px rgba(252, 88, 66, 0.2);
  }
`;

const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 16px;
  line-height: 18px;
  color: white;
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
export default PrimaryButton;
