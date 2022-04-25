import React, { useEffect } from "react";
import styled from "styled-components";
import CardsSlider from "./components/CardsSlider";
import Subscribe from "src/types/subscribe";
import CodeView from "./components/CodeView";
import PrimaryButton from "src/components/PrimaryButton";
import { SubscribesSelectors, setHold } from "src/redux/Subscribes";
import { useAppSelector, RootState, useAppDispatch } from "src/redux/store";
import Code from "src/types/code";
import { CheckCode, CodesSelectors } from "src/redux/Codes";
import { useRouter } from "next/router";

type SubscriptionsContainerProps = {
  subscribes: Array<Subscribe>;
};

const SubscriptionsContainer: React.FC<SubscriptionsContainerProps> = ({
  subscribes,
}) => {
  const currentSubscribe = useAppSelector((state: RootState) =>
    SubscribesSelectors.getCurrentSubscribe(state)
  );
  const codes: Array<Code> = useAppSelector((state: RootState) => {
    return CodesSelectors.getCodesBySubscribeId(
      state,
      currentSubscribe ? currentSubscribe!.id : 0
    );
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const upgradeButtonHandler = () => {
    router.push("/upgrade-subscribe", "/upgrade-subscribe", { shallow: true });
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
    <Wrapper>
      <TopContainer>
        <Title>My subscriptions</Title>
        <PrimaryButton title="Upgrade" onClick={upgradeButtonHandler} />
      </TopContainer>
      <CardsSlider subscribes={subscribes} />
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
    </Wrapper>
  );
};
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 54px;
  line-height: 64px;
  color: #ffffff;
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
`;
const CodeViewWrapper = styled.div`
  margin-top: 32px;
`;

export default SubscriptionsContainer;
