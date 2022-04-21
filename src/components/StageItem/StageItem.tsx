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
      <ActiveMarker isActive={stages.includes(title)} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 8px 0px 8px;
  min-width: 195px;
`;
const Title = styled.div`
  font-family: "THICCCBOI-semiBold";
  color: white;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  padding: 20px 0px 20px 0px;
`;
const ActiveMarker = styled.div`
  background: ${({ isActive }: { isActive: boolean }) => {
    return isActive ? "#fc5842" : "#393939";
  }};
  border-radius: 15px;
  height: 8px;
  width: 100%;
`;
export default StageItem;
