import React from "react";
import styled, { keyframes } from "styled-components";
import Loader from "src/svg/Loader";
type SecondaryButtonProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  tabindex?: number;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  loading,
  disabled,
  tabindex,
  onClick,
}) => {
  return (
    <Wrapper
      disabled={disabled != undefined ? disabled : false}
      onClick={onClick}
      tabindex={tabindex}
    >
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
  color: ${({ theme }) => theme.colors.redOrange};
`;
type WrapperProps = {
  disabled?: boolean;
  tabindex?: number;
};

const Wrapper = styled.div.attrs<WrapperProps>(({ tabindex }) => ({
  tabIndex: tabindex,
}))<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${({ theme }) => theme.colors.white};
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
  pointer-events: ${({ disabled }) => {
    return disabled ? "none" : "auto";
  }};
  cursor: default;
  &:hover {
    background: ${({ theme }) => theme.colors.white2};
    box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
    transform: scale(1.03);
  }
  &:hover ${Title} {
    color: ${({ theme }) => theme.colors.strawberryRed};
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
