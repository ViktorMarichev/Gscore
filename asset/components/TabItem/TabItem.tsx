import React from "react";
import styled from "styled-components";

type TabItemProps = {
  title: string;
  activeTab: string;
  onClick: (title: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({ title, activeTab, onClick }) => {
  return (
    <Wrapper onClick={() => onClick(title)}>
      <Title isActive={activeTab === title}>{title}</Title>
      {activeTab === title ? <ActiveMarker /> : null}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  padding: 12px 24px 12px 24px;
  cursor: default;
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-weight: 700;
  color: ${({ isActive }: { isActive: boolean }) => {
    return isActive ? "#fc5842" : "#393939";
  }};
`;
const ActiveMarker = styled.div`
  position: absolute;
  border-bottom: 2px solid #fc5842;
  width: 100%;
  bottom: -2px;
  right: 0px;
`;
export default TabItem;
