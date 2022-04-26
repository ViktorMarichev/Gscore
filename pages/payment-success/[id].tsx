import React, { useState, useEffect } from "react";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import styled from "styled-components";
import Container from "src/components/Container";
import MainLayout from "src/components/MainLayout";
import Product from "src/types/product";
import { useRouter } from "next/router";
import { wrapper } from "src/redux/store";
import PaymentMessage from "src/components/PaymentMessage";
import { ProductsSelectors } from "src/redux/Products";
import { useAppSelector } from "src/redux/store";

const PaymentSuccess: NextPage = () => {
  const router = useRouter();
  const product: Product = useAppSelector((state) => {
    return ProductsSelectors.getProductById(state, Number(router.query.id!))[0];
  });

  useEffect(() => {
    if (!product) router.replace("/");
  }, [product]);
  if (!product) {
    return (
      <MainLayout>
        <Wrapper>Loading...</Wrapper>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Wrapper>
        <PaymentMessage product={product} />
      </Wrapper>
    </MainLayout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 620px;
`;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    //  console.log("getUser", store.getState().user);

    return {
      props: {},
    };
  });

export default PaymentSuccess;
