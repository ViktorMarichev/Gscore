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
import { useRouter } from "next/router";
import { wrapper } from "src/redux/store";
import { Subscribes } from "src/redux/api/subscribes";
import { AxiosResponse, AxiosError } from "axios";
import Subscribe from "src/types/subscribe";
import PrimaryButton from "src/components/PrimaryButton";
import { useAppSelector, useAppDispatch } from "src/redux/store";
import Code from "src/types/code";
import { Codes } from "src/redux/api/codes";
import { setCodes } from "src/redux/Codes";
import { CodesSelectors } from "src/redux/Codes";
import {
  setSubscribes,
  SubscribesSelectors,
  setHold,
} from "src/redux/Subscribes";

import { UserSelectors } from "src/redux/User";
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
  const isWithHeld = useAppSelector((state) => state.subscribes.isWithHeld);
  const selectedCodes = useAppSelector((state) =>
    CodesSelectors.getSelectedCodes(state)
  );
  const selectedSubscribe: Subscribe | null = useAppSelector((state) =>
    SubscribesSelectors.getCurrentSubscribe(state)
  );
  const user = useAppSelector((state) => UserSelectors.userData(state));

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

  const releaseHoldHandler = (subscribeId: number) => {
    if (selectedCodes.length > 0) {
      Codes.releaseHold({
        token: user.token!,
        codesIds: selectedCodes,
        subscribeId,
      })
        .then((res: AxiosResponse) => {
          Subscribes.getSubscribes({ token: user.token! })
            .then((res: AxiosResponse) => {
              Codes.getAll({ token: user.token! })
                .then((res: AxiosResponse) => {
                  dispatch(setCodes({ codes: res.data }));
                })
                .catch((err: AxiosError) => {
                  alert(err.message);
                  router.reload();
                });
            })
            .catch((err: AxiosError) => {
              if (err.response) {
                alert(JSON.stringify(err.response.data.message));
                router.reload();
              } else {
                alert(JSON.stringify(err.message));
              }
              router.reload();
            });
        })
        .catch((err: AxiosError) => {
          if (err.response) {
            alert(JSON.stringify(err.response.data.message));
          } else {
            alert(JSON.stringify(err.message));
          }
        });
    }
  };

  if (serverSubscribes.length <= 0) {
    return (
      <Container>
        <MainLayout>Loading...</MainLayout>
      </Container>
    );
  }
  return (
    <Container>
      <MainLayout>
        <Grid>
          <SliderWrapper>
            <SubscriptionsContainer subscribes={serverSubscribes} />
          </SliderWrapper>
          {isWithHeld ? (
            <>
              <Hint>Select the domains you want to keep</Hint>
              <ButtonWrapper>
                <PrimaryButton
                  title="Confirm"
                  onClick={() => releaseHoldHandler(selectedSubscribe!.id)}
                />
              </ButtonWrapper>
            </>
          ) : null}
        </Grid>
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
const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  grid-template-rows: 1fr auto;
  grid-row-gap: 74px;
  grid-template-areas:
    "slider slider slider"
    "hint . button";
`;
const SliderWrapper = styled.div`
  width: 100%;
  grid-area: slider;
`;
const Hint = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 20px;
  line-height: 22px;
  color: #ffffff;
  grid-area: hint;
  align-self: center;
`;
const ButtonWrapper = styled.div`
  grid-area: button;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
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
