import React from "react";
import styled from "styled-components";
import ArrowLeft from "src/svg/ArrowLeft";
import ArrowRight from "src/svg/ArrowRight";

type ArrowButtonProps = {
  direction: "left" | "right";
  lastSlide: number;
  currentSlide: number;
  tabindex?: number;
  onClick: () => void;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  currentSlide,
  lastSlide,
  tabindex,
  onClick,
}) => {
  return (
    <Wrapper
      currentSlide={currentSlide}
      lastSlide={lastSlide}
      direction={direction}
      tabindex={tabindex}
      onClick={onClick}
    >
      {direction === "left" ? <ArrowLeft /> : <ArrowRight />}
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs(({ tabindex }: ArrowButtonProps) => ({
  tabindex: tabindex !== undefined ? tabindex : null,
}))`
  pointer-events: ${({
    currentSlide,
    lastSlide,
    direction,
  }: ArrowButtonProps) => {
    if (direction === "left" && currentSlide === 0) {
      return "none";
    } else if (direction === "right" && currentSlide === lastSlide) {
      return "none";
    } else {
      return "auto";
    }
  }};
  padding: 10px;
  display: flex;
  flex-direction: center;
  align-items: center;
  border: 1px solid #969696;
  border-radius: 12px;
  position: relative;
  &::after {
    content: "";
    border-radius: 4px;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    transition: opacity 0.6s;
    opacity: ${({ direction, currentSlide, lastSlide }: ArrowButtonProps) => {
      if (direction === "left" && currentSlide === 0) {
        return 1;
      } else if (direction === "right" && currentSlide === lastSlide) {
        return 1;
      } else {
        return 0;
      }
    }};
    border-radius: 12px;
  }
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.98);
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

export default ArrowButton;
