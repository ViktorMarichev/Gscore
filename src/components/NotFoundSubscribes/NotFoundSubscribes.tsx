import React from "react";
import styled from "styled-components";
import Cross from "src/svg/Close";
import PrimaryButton from "../PrimaryButton";
import { useRouter } from "next/router";

const NotFoundSubscribes: React.FC = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <CrossWrapper>
        <Cross />
      </CrossWrapper>
      <Title>No active subscriptions</Title>
      <Hint>You can subscribe right now by clicking on the button below</Hint>
      <ButtonWrapper>
        <PrimaryButton title="Get Gscore" onClick={() => router.push("/")} />
      </ButtonWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 431px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: calc(50px + (200 - 50) * ((100vw - 375px) / (1440 - 375)));
  padding-bottom: calc(50px + (180 - 50) * ((100vw - 375px) / (1440 - 375)));
`;
const ButtonWrapper = styled.div`
  margin-top: 32px;
`;
const CrossWrapper = styled.div`
  width: 96px;
  height: 96px;
  background: ${({ theme }) => theme.colors.grayBrown};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 640px) {
    width: 66px;
    height: 66px;
  }
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;
const Hint = styled.div`
  margin-top: 8px;
  font-family: "THICCCBOI-regular";
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

export default NotFoundSubscribes;
