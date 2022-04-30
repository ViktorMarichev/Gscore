import React from "react";
import styled from "styled-components";
import Subscribe from "src/types/subscribe";
import SecondaryButton from "src/components/SecondaryButton";
import StatusLabel from "src/components/StatusLabel";
import { useAppSelector } from "src/redux/store";
import { SubscribesSelectors } from "src/redux/Subscribes";
import { useAppDispatch } from "src/redux/store";
import { setSubscribeView } from "src/redux/Subscribes";
//subscribe->Code

type CardProps = {
  subscribe: Subscribe;
  isSlide: boolean;
};

const Card: React.FC<CardProps> = ({ subscribe, isSlide }) => {
  const dispatch = useAppDispatch();
  const currentSubscribe = useAppSelector((state) =>
    SubscribesSelectors.getCurrentSubscribe(state)
  );

  const formatDate = (date: Date) => {
    let dd: string | number = date.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm: string | number = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    let yy: string | number = date.getFullYear() % 100;
    if (yy < 10) yy = "0" + yy;

    return dd + "." + mm + "." + yy;
  };
  return (
    <Wrapper className="keen-slider__slide">
      {(currentSubscribe ? currentSubscribe.id : null) !== subscribe.id ? (
        <Cover></Cover>
      ) : null}
      <CardHeader>
        <CardTitle>Gscore</CardTitle>
        <SubscribeStatus status={subscribe.status}>
          {subscribe.status}
        </SubscribeStatus>
      </CardHeader>
      <CardBody>
        <BodyTop>
          <SubscribeDetails>
            <SubscribeName>{subscribe.product.name}</SubscribeName>
            <ValidUntil>
              valid until{" "}
              {formatDate(new Date(Number(subscribe.currentPeriodStart)))}
            </ValidUntil>
          </SubscribeDetails>
          <Price>${subscribe.product.prices[0].price}</Price>
        </BodyTop>
        <BodyBottom>
          <SecondaryButton
            title="View"
            onClick={() => dispatch(setSubscribeView())}
          />
        </BodyBottom>
      </CardBody>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.grayBrown};
  box-shadow: 0px 24px 65px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  min-width: 620px;
`;
const Cover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  background: rgba(0, 0, 0, 0.486);
  border-radius: 12px;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 48px 64px 32px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.pearlLightGray};
`;
const CardBody = styled.div`
  padding: 32px 0px 48px 32px;
`;
const SubscribeName = styled.div`
  font-family: "THICCCBOI-medium";
  font-style: normal;

  font-size: 24px;

  color: ${({ theme }) => theme.colors.white};
`;
const CardTitle = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 22px;
  width: 80%;
  color: ${({ theme }) => theme.colors.white};
`;
const SubscribeStatus = styled(StatusLabel)`
  width: 20%;
`;
const SubscribeDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 80%;
`;
const Price = styled.div`
  width: 20%;
  font-family: "THICCCBOI-medium";
  font-style: normal;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;
const BodyTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 61px;
`;
const ValidUntil = styled.div`
  padding-top: 12px;
  font-family: "THICCCBOI-medium";
  font-style: normal;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.pearlLightGray};
`;
const BodyBottom = styled.div`
  width: 100%;
  display: flex;
  padding-top: 32px;
`;
export default Card;
