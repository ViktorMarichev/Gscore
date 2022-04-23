import React, { useState } from "react";
import type { NextPage, NextPageContext } from "next";
import styled from "styled-components";
import Container from "@components/Container";
import MainLayout from "@components/MainLayout";
import StageItem from "@components/StageItem";
import RegistrationForm from "@components/RegistrationForm";
import AuthorizationForm from "@components/AuthorizationForm";
import PurchaseForm from "@components/PurchaseForm";
import { useRouter } from "next/router";
import { UserSelectors } from "src/redux/User";
import { useAppSelector } from "src/redux/store";
import jsHttpCookie from "cookie";

const Subscribing: NextPage<{ token?: string }> = ({ token }) => {
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const [stages, setStages] = useState<Array<string>>(
    user.token ? ["Create account", "Log in", "Checkout"] : ["Create account"]
  );

  const router = useRouter();
  const skipHandler = (stage: string) => {
    setStages([...stages, stage]);
  };

  return (
    <Container>
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
    </Container>
  );
};

export async function getServerSideProps({ query, req }: NextPageContext) {
  const initProps: { props: { token?: string } } = { props: {} };

  /* if (req && req.headers) {
    const headers = req.headers;
    console.log(headers);
    if (headers.cookie) {
      const cookiesJSON = jsHttpCookie.parse(headers.cookie);

      initProps.props.token = cookiesJSON.token;
    }
  }*/

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
`;

export default Subscribing;
