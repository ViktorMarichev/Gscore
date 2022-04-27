import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardsSlider from "./components/CardsSlider";
import Subscribe from "src/types/subscribe";
import CodeView from "./components/CodeView";
import PrimaryButton from "src/components/PrimaryButton";
import { Subscribes } from "src/redux/api/subscribes";
import { SubscribesSelectors, setHold } from "src/redux/Subscribes";
import { useAppSelector, RootState, useAppDispatch } from "src/redux/store";
import Code from "src/types/code";
import { Codes } from "src/redux/api/codes";
import { AxiosError, AxiosResponse } from "axios";
import useResizeObserver from "use-resize-observer";
import { CheckCode, CodesSelectors, setCodes } from "src/redux/Codes";
import { UserSelectors } from "src/redux/User";
import { useRouter } from "next/router";

type SubscriptionsContainerProps = {
  subscribes: Array<Subscribe>;
};

const SubscriptionsContainer: React.FC<SubscriptionsContainerProps> = ({
  subscribes,
}) => {
  const [isSmal, setIsSmal] = useState(false);
  const { ref, width } = useResizeObserver({
    onResize: ({ width, height }) => {
      if (width! <= 640) {
        setIsSmal(true);
      } else {
        setIsSmal(false);
      }
    },
  });

  const selectedCodes = useAppSelector((state) =>
    CodesSelectors.getSelectedCodes(state)
  );
  const currentSubscribe: Subscribe | null = useAppSelector((state) =>
    SubscribesSelectors.getCurrentSubscribe(state)
  );
  const user = useAppSelector((state) => UserSelectors.userData(state));

  const codes: Array<Code> = useAppSelector((state: RootState) => {
    return CodesSelectors.getCodesBySubscribeId(
      state,
      currentSubscribe ? currentSubscribe!.id : 0
    );
  });
  const isWithHeld = useAppSelector((state) => state.subscribes.isWithHeld);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const upgradeButtonHandler = () => {
    router.push("/upgrade-subscribe", "/upgrade-subscribe", { shallow: true });
  };

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

  useEffect(() => {
    if (codes.length > 0) {
      if (codes[0].status === "HOLD") {
        dispatch(setHold({ isWithHeld: true }));
      } else {
        dispatch(setHold({ isWithHeld: false }));
      }
    }
  }, [codes]);

  return (
    <Wrapper ref={ref}>
      <TopContainer>
        <Title>My subscriptions</Title>
        <ButtonContainer>
          {isSmal ? (
            <UpgradeLabel onClick={upgradeButtonHandler}>Upgrade</UpgradeLabel>
          ) : (
            <PrimaryButton title="Upgrade" onClick={upgradeButtonHandler} />
          )}
        </ButtonContainer>
      </TopContainer>
      <CardsSlider subscribes={subscribes} />
      <Grid>
        <CodeViewList>
          {codes!.map((code: Code) => {
            return (
              <CodeViewWrapper key={code.id}>
                <CodeView
                  id={code.id}
                  checked={false}
                  ChangeChacked={() => {
                    dispatch(CheckCode({ codeId: code.id }));
                  }}
                  status={code.status}
                  origin={code.origin!}
                  code={code.code}
                />
              </CodeViewWrapper>
            );
          })}
        </CodeViewList>
        {isWithHeld ? (
          <>
            <Hint>Select the domains you want to keep</Hint>
            <ButtonWrapper>
              <PrimaryButton
                title="Confirm"
                onClick={() => releaseHoldHandler(currentSubscribe!.id)}
              />
            </ButtonWrapper>
          </>
        ) : null}
      </Grid>
    </Wrapper>
  );
};
const ButtonContainer = styled.div`
  width: 152px;

  @media (max-width: 640px) {
    width: auto;
  }
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: calc(28px + (54 - 28) * ((100vw - 375px) / (1440 - 375)));
  line-height: calc(40px + (64 - 40) * ((100vw - 375px) / (1440 - 375)));
  color: #ffffff;
`;
const UpgradeLabel = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #fc5842;
  cursor: pointer;
`;
const Hint = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 20px;
  line-height: 22px;
  color: #ffffff;
  grid-area: hint;
  align-self: center;
  @media (max-width: 640px) {
    align-self: flex-end;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-row-gap: 48px;
  grid-template-areas:
    "codes codes codes"
    "hint . button";

  @media (max-width: 640px) {
    grid-template-rows: 1fr auto 1fr;
    grid-template-columns: 1fr 128px;
    grid-row-gap :28px;
    grid-row-gap: 0px;
    grid-template-areas:
      "hint ."
      "codes codes"
      "button button";
  }
`;

const ButtonWrapper = styled.div`
  grid-area: button;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 148px;
  justify-self: flex-end;
  @media (max-width: 640px) {
    padding-top: 36px;
    width: 100%;
    justify-content: center;
    lign-items: center;
    align-self: center;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 44px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const CodeViewList = styled.div`
  width: 100%;
  grid-area: codes;
`;
const CodeViewWrapper = styled.div`
  margin-top: 32px;
`;

export default SubscriptionsContainer;
