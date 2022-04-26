import React, { useEffect, useState } from "react";
import type { NextPage, NextPageContext } from "next";
import styled from "styled-components";
import Container from "src/components/Container";
import MainLayout from "src/components/MainLayout";
import StageItem from "src/components/StageItem";
import RegistrationForm from "src/components/RegistrationForm";
import AuthorizationForm from "src/components/AuthorizationForm";
import PurchaseForm from "src/components/PurchaseForm";
import { useRouter } from "next/router";
import { UserSelectors } from "src/redux/User";
import { useAppSelector } from "src/redux/store";
import { ProductsSelectors } from "src/redux/Products";

const Subscribing: NextPage = () => {
  const router = useRouter();
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const selectedProduct = useAppSelector((state) =>
    ProductsSelectors.getProductById(state, Number(router.query.id))
  );
  const [stages, setStages] = useState<Array<string>>(
    user.token ? ["Create account", "Log in", "Checkout"] : ["Create account"]
  );

  const skipHandler = (stage: string) => {
    setStages([...stages, stage]);
  };
  useEffect(() => {
    if (!selectedProduct) {
      router.replace("/");
    }
  }, [selectedProduct]);

  return (
    <MainLayout>
      <Wrapper>
        <Stages>
          <StageItem stages={stages} title="Create account" />
          <StageItem stages={stages} title="Log in" />
          <StageItem stages={stages} title="Checkout" />
        </Stages>
        {stages[stages.length - 1] === "Create account" ? (
          <RegistrationForm skipMethod={skipHandler} />
        ) : null}
        {stages[stages.length - 1] === "Log in" ? (
          <AuthorizationForm skipMethod={skipHandler} />
        ) : null}
        {stages[stages.length - 1] === "Checkout" ? (
          <PurchaseForm productId={Number(router.query.id)} />
        ) : null}
      </Wrapper>
    </MainLayout>
  );
};

export async function getServerSideProps({ query, req }: NextPageContext) {
  const initProps: { props: { token?: string } } = { props: {} };

  return initProps;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 620px;
`;
const Stages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    align-items: flex-end;
  }
`;

export default Subscribing;
