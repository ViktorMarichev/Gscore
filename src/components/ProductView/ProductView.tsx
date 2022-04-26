import React from "react";
import styled from "styled-components";
import Checked from "src/svg/Check";
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
          color={isActive ? " #fc5842" : "#272727"}
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
const CheckCircle = styled.div`
  border-radius: 100%;
  background-color: #ffffff;
  width: 26px;
  height: 26px;
  margin-right: 14px;
`;
const Wrapper = styled.div`
  position: relative;
  top: ${({ $isActive }: { $isActive: boolean }) => {
    return $isActive ? "-49.8px" : "0px";
  }};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: calc(12px + (42 - 12) * ((100vw - 375px) / (1440 - 375)));
  max-width: 404px;
  background: ${({ $isActive }: { $isActive: boolean }) => {
    return $isActive ? " #fc5842" : "#272727";
  }};
  box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  @media (max-width: 960px) {
    top:0px;
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
  color: #ffffff;
`;
const Description = styled.div`
  font-family: "THICCCBOI-medium";
  font-style: normal;
  font-size: calc(16px + (18 - 16) * ((100vw - 375px) / (1440 - 375)));
  padding-top: 8px;
  text-align: center;
  color: ${({ $isActive }: { $isActive: boolean }) => {
    return $isActive ? " #FFFFFF" : "#c7c7c7";
  }};
`;
const Price = styled.div`
  font-family: "DMSans-bold";
  font-size: calc(34px + (54 - 34) * ((100vw - 375px) / (1440 - 375)));
  color: #ffffff;
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: calc(20px + (40 - 20) * ((100vw - 375px) / (1440 - 375)));
  border-bottom: 1px solid #969696;
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
  font-size: calc(17px + (18 - 17) * ((100vw - 375px) / (1440 - 375)));
  margin-bottom: calc(14px + (22 - 14) * ((100vw - 375px) / (1440 - 375)));
  max-width: 250px;
  color: #ffffff;
`;
const Button = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  width: 100%;
  padding-top: calc(14px + (26 - 14) * ((100vw - 375px) / (1440 - 375)));
  padding-bottom: calc(14px + (26 - 14) * ((100vw - 375px) / (1440 - 375)));
  font-family: "THICCCBOI-bold";
  font-size: 18px;
  margin-top: 13px;
  color: ${({ $isActive }: { $isActive: boolean }) => {
    return $isActive ? " #FC5842" : "#181818";
  }};
  &:active {
    transform: scale(0.98);
  }
`;

export default ProductView;
