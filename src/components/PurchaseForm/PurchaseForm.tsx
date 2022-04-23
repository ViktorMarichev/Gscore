import React, { useEffect } from "react";
import styled from "styled-components";
import InputField from "src/components/InputField";
import PrimaryButton from "src/components/PrimaryButton";
import { ProductsSelectors } from "src/redux/Products";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { useRouter } from "next/router";
import Product from "src/types/product";

const PurchaseForm: React.FC<{ productId: number }> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const product: Product = useAppSelector(
    (state) => ProductsSelectors.getProductById(state, productId)[0]
  );
  useEffect(() => {
    if (!product) {
      router.replace("/", "/", { shallow: true });
    }
  }, [product]);

  if (!product) {
    return (
      <Wrapper>
        <Title>Checkout</Title>
        Loading...
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Checkout</Title>
      <ProductDetails>
        <DetailsTitles>
          <PackageNameTitle>Package name</PackageNameTitle>
          <PackageNameTitle>Price</PackageNameTitle>
        </DetailsTitles>
        <DetailsPackage>
          <PackageInfo>{product.name}</PackageInfo>
          <PackageInfo>${product.prices[0].price}</PackageInfo>
        </DetailsPackage>
      </ProductDetails>
      <TotalCostWrapper>
        <TotalCostTitle>Total</TotalCostTitle>
        <TotalCost>${product.prices[0].price}</TotalCost>
      </TotalCostWrapper>
      <ButtonWrapper>
        <PrimaryButton onClick={() => {}} title="Purchase" />
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
const DetailsPackage = styled(DetailsTitles)`
  border: 0;
`;
const DetailsTitle = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 24px;
  line-height: 34px;
  color: #ffffff;
`;
const PackageInfo = styled.div`
  font-family: "THICCCBOI-regular";
  font-style: normal;
  font-size: 24px;
  line-height: 38px;
  color: #ffffff;
`;
const PackageNameTitle = styled(DetailsTitle)``;
const TotalCostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
`;
const TotalCostTitle = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 28px;
  line-height: 40px;
  color: #ffffff;
`;
const TotalCost = styled(TotalCostTitle)``;

export default PurchaseForm;
