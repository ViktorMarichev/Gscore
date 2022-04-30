import React from "react";
import styled from "styled-components";
import Checked from "src/svg/Check";
import { theme } from "src/Theme";

type ProductViewProps = {
  isActive: boolean;
  price: number;
  name: string;
  sitesCount: number;
  selectProduct: () => void;
  id: number;
  disabled?: boolean;
};

const FeatureItem: React.FC<{ isActive: boolean; text: string }> = ({
  isActive,
  text,
}) => {
  return (
    <FeatureItemWrapper>
      <CheckCircle>
        <Checked
          color={isActive ? theme.colors.redOrange : theme.colors.signalBlack}
          viewBox={"0 0 26 26"}
          transform="translate(4 6)"
          preserveAspectRatio="xMidYMid meet"
        />
      </CheckCircle>
      {text}
    </FeatureItemWrapper>
  );
};

const ProductView: React.FC<ProductViewProps> = ({
  id,
  isActive,
  price,
  name,
  sitesCount,
  selectProduct,
  disabled,
}) => {
  return (
    <Wrapper $isActive={isActive}>
      {disabled ? <Cover></Cover> : null}
      <Head>
        <Price>${price}</Price>
        <Name>{name}</Name>
        <Description $isActive={isActive}>
          Get the advanced WordPress plugin that optimizes content with GSC
          keywords at one low annual price
        </Description>
      </Head>
      <Bottom>
        <FeatureList>
          <FeatureItem
            text={
              sitesCount > 1
                ? `All features for ${sitesCount} sites`
                : "Single site license"
            }
            isActive={isActive}
          />
          <FeatureItem
            text="Special introductory pricing"
            isActive={isActive}
          />
          <FeatureItem
            text="Unlimited Pages and Keywords"
            isActive={isActive}
          />
          <FeatureItem text="Billed annually" isActive={isActive} />
        </FeatureList>
        <Button onClick={selectProduct} $isActive={isActive}>
          Get Gscore
        </Button>
      </Bottom>
    </Wrapper>
  );
};

type WrapperProps = {
  $isActive: boolean;
};
type ButtonProps = {
  $isActive: boolean;
};
type DescriptionProps = {
  $isActive: boolean;
};

const CheckCircle = styled.div`
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  width: 26px;
  height: 26px;
  margin-right: 14px;
`;
const Wrapper = styled.div<WrapperProps>`
  position: relative;
  top: ${({ $isActive }) => {
    return $isActive ? "-49.8px" : "0px";
  }};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 42px 48px 42px 48px;
  max-width: 404px;
  background: ${({ $isActive, theme }) => {
    return $isActive ? theme.colors.redOrange : theme.colors.signalBlack;
  }};
  box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  @media (max-width: 1100px) {
    padding: calc(12px + (42 - 12) * ((100vw - 375px) / (1440 - 375)));
    padding-left: 15px;
    padding-right: 15px;
  }
  @media (max-width: 960px) {
    top: 0px;
  }
`;
const Cover = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: 5;
  background: rgba(0, 0, 0, 0.486);
`;

const Name = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;
const Description = styled.div<DescriptionProps>`
  width: 308px;
  height: 90px;
  font-family: "THICCCBOI-medium";
  font-style: normal;
  font-size: 18px;
  padding-top: 8px;
  line-height: 30px;
  text-align: center;
  color: ${({ $isActive, theme }) => {
    return $isActive ? theme.colors.white : theme.colors.silver;
  }};
  @media (max-width: 1400px) {
    font-size: calc(16px + (18 - 16) * ((100vw - 375px) / (1440 - 375)));
    width: auto;
  }
`;
const Price = styled.div`
  font-family: "DMSans-bold";
  font-size: 54px;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 1400px) {
    font-size: calc(34px + (54 - 34) * ((100vw - 375px) / (1440 - 375)));
  }
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.pearlLightGray};
  @media (max-width: 1400px) {
    padding-bottom: calc(20px + (40 - 20) * ((100vw - 375px) / (1440 - 375)));
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
const FeatureList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  margin-top: 41px;
  list-style-type: none;
`;
const FeatureItemWrapper = styled.li`
  width: 100%;
  display: -webkit-box;
  font-size: 18px;
  margin-bottom: 22px;
  max-width: 250px;
  color: ${({ theme }) => theme.colors.white};
  word-wrap: break-word;
  @media (max-width: 1400px) {
    font-size: calc(17px + (18 - 17) * ((100vw - 375px) / (1440 - 375)));
    margin-bottom: calc(14px + (22 - 14) * ((100vw - 375px) / (1440 - 375)));
  }

  @media (max-width: 1100px) {
    padding-right: 10px;
  }
  @media (max-width: 960px) {
    padding-right: 0px;
  }
`;
const Button = styled.div<ButtonProps>`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  width: 100%;
  padding-top: 26px;
  padding-bottom: 26px;
  font-family: "THICCCBOI-bold";
  font-size: 18px;
  margin-top: 13px;
  color: ${({ $isActive, theme }) => {
    return $isActive ? theme.colors.redOrange : theme.colors.graphiteBlack;
  }};
  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 1400px) {
    padding-top: calc(14px + (26 - 14) * ((100vw - 375px) / (1440 - 375)));
    padding-bottom: calc(14px + (26 - 14) * ((100vw - 375px) / (1440 - 375)));
  }
`;

export default ProductView;
