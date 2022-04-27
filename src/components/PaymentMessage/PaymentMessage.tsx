import React from "react";
import styled from "styled-components";
import ProductDetails from "src/components/ProductDetails";
import Product from "src/types/product";
import PrimaryButton from "src/components/PrimaryButton";

type PaymentMessageProps = {
  product: Product;
};

const PaymentMessage: React.FC<PaymentMessageProps> = ({ product }) => {
  return (
    <Wrapper>
      <Title>Start your subscription</Title>
      <SubTitle>
        We have sent you a payment receipt by e-mail and a link to download the
        plugin with a license key.
      </SubTitle>
      <ProductDetails
        name={product.name}
        price={Number(product.prices[0].price)}
      />
      <ButtonWrapper>
        <PrimaryButton title="Go to my subscriptions" onClick={() => {}} />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: calc(24px + (44 - 24) * ((100vw - 375px) / (1440 - 375)));
  line-height: 54px;
  color: #ffffff;
  padding-top: 32px;
  padding-bottom: 16px;
  @media (max-width: 640px) {
    line-height: 30px;
    padding-top: 22px;
  }
`;
const SubTitle = styled.div`
  font-family: "THICCCBOI-medium";
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  overflow: visible;
  text-overflow: ellipsis;
  padding-bottom: 48px;
  max-width: 620px;

  @media (max-width: 640px) {
    padding-bottom: 20px;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 48px;
`;
export default PaymentMessage;
