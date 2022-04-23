import React from "react";
import styled from "styled-components";
import Checked from "@svg/Check";
import { useRouter } from "next/router";
type ProductViewProps = {
  style: "dark" | "light";
  price: number;
  name: string;
  sitesCount: number;
  id: number;
};

const FeatureItem: React.FC<{ style: "light" | "dark"; text: string }> = ({
  style,
  text,
}) => {
  return (
    <FeatureItemWrapper>
      <CheckCircle>
        <Checked
          color={style === "light" ? " #fc5842" : "#272727"}
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
  style,
  price,
  name,
  sitesCount,
}) => {
  const router = useRouter();
  return (
    <Wrapper style={style}>
      <Head>
        <Price>${price}</Price>
        <Name>{name}</Name>
        <Description style={style}>
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
            style={style}
          />
          <FeatureItem text="Special introductory pricing" style={style} />
          <FeatureItem text="Unlimited Pages and Keywords" style={style} />
          <FeatureItem text="Billed annually" style={style} />
        </FeatureList>
        <Button
          onClick={() =>
            router.push("/subscribing/[id]", "/subscribing/" + id, {
              shallow: true,
            })
          }
          style={style}
        >
          Get Gscore
        </Button>
      </Bottom>
    </Wrapper>
  );
};
const CheckCircle = styled.div`
  border-radius: 50%;
  background-color: #ffffff;
  width: 26px;
  height: 26px;
  margin-right: 14px;
`;
const Wrapper = styled.div`
  position: relative;
  top: ${({ style }: { style: "dark" | "light" }) => {
    return style === "light" ? "-49.8px" : "0px";
  }};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 42px;
  max-width: 404px;
  background: ${({ style }: { style: "dark" | "light" }) => {
    return style === "light" ? " #fc5842" : "#272727";
  }};
  box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
`;
const Name = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 24px;
  color: #ffffff;
`;
const Description = styled.div`
  font-family: "THICCCBOI-medium";
  font-style: normal;
  font-size: 18px;
  padding-top: 8px;
  text-align: center;
  color: ${({ style }: { style: "dark" | "light" }) => {
    return style === "light" ? " #FFFFFF" : "#c7c7c7";
  }};
`;
const Price = styled.div`
  font-family: "DMSans-bold";
  font-size: 54px;
  color: #ffffff;
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
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
  display: flex;
  align-items: center;
  font-family: "THICCCBOI-medium";
  font-size: 18px;
  margin-bottom: 22px;
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
  padding: 26px 0px 26px 0px;
  font-family: "THICCCBOI-bold";
  font-size: 18px;
  margin-top: 13px;
  color: ${({ style }: { style: "dark" | "light" }) => {
    return style === "light" ? " #FC5842" : "#181818";
  }};
  &:active {
    transform: scale(0.98);
  }
`;

export default ProductView;
