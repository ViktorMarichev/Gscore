import React, { useEffect } from "react";
import styled from "styled-components";
import InputField from "src/components/InputField";
import PrimaryButton from "src/components/PrimaryButton";
import { ProductsSelectors } from "src/redux/Products";
import { useAppSelector } from "src/redux/store";
import ProductDetails from "src/components/ProductDetails";
import { UserSelectors } from "src/redux/User";
import { Products } from "src/redux/api/products";
import { useRouter } from "next/router";
import Product from "src/types/product";

const PurchaseForm: React.FC<{ productId: number }> = ({ productId }) => {
  const router = useRouter();
  const product: Product = useAppSelector(
    (state) => ProductsSelectors.getProductById(state, productId)[0]
  );
  const user = useAppSelector((state) => UserSelectors.userData(state));
  useEffect(() => {
    if (!product) {
      router.replace("/", "/", { shallow: true });
    }
  }, []);

  const purchaseHandler = () => {
    Products.buyProduct({ token: user.token!, priceId: product.prices[0].id })
      .then(() => {
        router.push("/payment-success/[id]", "/payment-success/" + productId, {
          shallow: true,
        });
      })
      .catch((err) => alert(err.message));
  };

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
      <ProductDetails
        name={product.name}
        price={Number(product.prices[0].price)}
      />
      <TotalCostWrapper>
        <TotalCostTitle>Total</TotalCostTitle>
        <TotalCost>${product.prices[0].price}</TotalCost>
      </TotalCostWrapper>
      <ButtonWrapper>
        <PrimaryButton onClick={purchaseHandler} title="Purchase" />
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
