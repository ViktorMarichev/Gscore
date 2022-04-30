import React from "react";
import styled from "styled-components";

type StageItemProps = {
  title: string;
  stages: Array<string>;
};

const StageItem: React.FC<StageItemProps> = ({ title, stages }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ActiveMarker $isActive={stages.includes(title)} />
    </Wrapper>
  );
};

type ActiveMarkerProps = {
  $isActive: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 8px 0px 8px;
  min-width: 195px;
  @media (max-width: 640px) {
    min-width: 100px;
  }
`;
const Title = styled.div`
  font-family: "THICCCBOI-semiBold";
  color: white;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  padding: 20px 0px 20px 0px;
  @media (max-width: 640px) {
    font-size: 18px;
    padding: 20px 0px 15px 0px;
  }
`;
const ActiveMarker = styled.div<ActiveMarkerProps>`
  background: ${({ $isActive, theme }) => {
    return $isActive ? theme.colors.redOrange : theme.colors.grayBrown;
  }};
  border-radius: 15px;
  height: 8px;
  width: 100%;
`;
export default StageItem;
