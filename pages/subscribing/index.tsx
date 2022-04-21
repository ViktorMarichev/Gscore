import React, { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import Container from "@components/Container";
import MainLayout from "@components/MainLayout";
import StageItem from "@components/StageItem";
import RegistrationForm from "@components/RegistrationForm";
import AuthorizationForm from "@components/AuthorizationForm";
import PurchaseForm from "@components/PurchaseForm";
const Subscribing: NextPage = () => {
  const [stages, setStages] = useState<Array<string>>([
    "Create account",
    "Log in",
    "Checkout",
  ]);

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
            <RegistrationForm />
          ) : null}
          {stages[stages.length - 1] === "Log in" ? (
            <AuthorizationForm />
          ) : null}
          {stages[stages.length - 1] === "Checkout" ? <PurchaseForm /> : null}
        </Wrapper>
      </MainLayout>
    </Container>
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
const Stages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Subscribing;
