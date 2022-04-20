import React, { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import Container from "@components/Container";
import MainLayout from "@components/MainLayout";
import StageItem from "@components/StageItem";
import AuthorizationForm from "@components/AuthorizationForm";
const Subscribing: NextPage = () => {
  const [stages, setStages] = useState<Array<string>>(["Create account"]);

  return (
    <Container>
      <MainLayout>
        <Wrapper>
          <Stages>
            <StageItem stages={stages} title="Create account" />
            <StageItem stages={stages} title="Log in" />
            <StageItem stages={stages} title="Checkout" />
          </Stages>
          <AuthorizationForm />
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
`;
const Stages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Subscribing;
