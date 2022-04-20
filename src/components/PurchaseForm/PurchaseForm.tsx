import React from "react";
import styled from "styled-components";
import InputField from "@components/InputField";
import PrimaryButton from "@components/PrimaryButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const PurchaseForm: React.FC = () => {
  return (
    <Wrapper>
      <Title>Checkout</Title>
      <ProductDetails>
        <DetailsTitles></DetailsTitles>
      </ProductDetails>
      <ButtonWrapper>
        <PrimaryButton title="Log in" />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 24px;
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 44px;
  line-height: 54px;
  color: #ffffff;
  padding-bottom: 32px;
  margin-top: 64px;
`;
const ProductDetails = styled.div`
  background: #272727;
  border-radius: 12px;
  width: 100%;
`;
const DetailsTitles = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #969696;
  padding: 42px 72px 32px 32px;
`;
const DetailsTitle = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 24px;
  line-height: 34px;
  color: #ffffff;
`;

export default PurchaseForm;
