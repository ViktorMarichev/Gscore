import React, { useState, useEffect } from "react";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import styled from "styled-components";
import Container from "src/components/Container";
import MainLayout from "src/components/MainLayout";
import SubscriptionsContainer from "src/components/SubscriptionsContainer";
import NotFoundSubscribes from "src/components/NotFoundSubscribes";
import { useRouter } from "next/router";
import { wrapper } from "src/redux/store";
import { Subscribes } from "src/redux/api/subscribes";
import { AxiosResponse, AxiosError } from "axios";
import Subscribe from "src/types/subscribe";
import PrimaryButton from "src/components/PrimaryButton";
import { useAppSelector, useAppDispatch } from "src/redux/store";

import Code from "src/types/code";

import { setCodes } from "src/redux/Codes";
import { CodesSelectors } from "src/redux/Codes";
import {
  setSubscribes,
  SubscribesSelectors,
  setHold,
} from "src/redux/Subscribes";

const _ = require("lodash");

type MySubscribes = {
  serverSubscribes: Array<Subscribe>;
  serverCodes: Array<Code>;
};

const MySubscribes: NextPage<MySubscribes> = ({
  serverSubscribes,
  serverCodes,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverSubscribes.length > 0) {
      dispatch(
        setSubscribes({
          currentSubscribe: serverSubscribes[0],
          subscribes: serverSubscribes,
          isWithHeld: serverSubscribes[0].codes[0].status === "HOLD",
        })
      );
      dispatch(setCodes({ codes: serverCodes, selectedCodes: [] }));
    }
  }, []);


  if (serverSubscribes.length === 0) {
    return (
      <MainLayout>
        <TitleWrapper>
          <Title>My subscriptions</Title>
        </TitleWrapper>
        <NotFoundSubscribes />
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <SliderWrapper>
        <SubscriptionsContainer subscribes={serverSubscribes} />
      </SliderWrapper>
    </MainLayout>
  );
};

const SliderWrapper = styled.div`
  width: 100%;
  grid-area: slider;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: calc(28px + (54 - 28) * ((100vw - 375px) / (1440 - 375)));
  line-height: calc(40px + (64 - 40) * ((100vw - 375px) / (1440 - 375)));
  color: #ffffff;
`;
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      if (!store.getState().user.token) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      } else {
        try {
          const res: AxiosResponse = await Subscribes.getSubscribes({
            token: store.getState().user.token!,
          });
          const data: Array<Subscribe> = res.data;
          let codes: Array<Code> = [];
          data.forEach((subscribe: Subscribe) => {
            codes = [...codes, ...subscribe.codes];
          });
          return {
            props: {
              serverSubscribes: data,
              serverCodes: codes,
            },
          };
        } catch (err) {
          console.log((err as AxiosError).message);
          return {
            props: {
              serverSubscribes: [],
            },
          };
        }
      }
    }
  );

export default MySubscribes;
