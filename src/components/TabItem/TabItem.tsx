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

type TitleProps = {
  isActive: boolean;
};

const Wrapper = styled.div`
  position: relative;
  padding: 12px 24px 12px 24px;
  cursor: default;
`;
const Title = styled.div<TitleProps>`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-weight: 700;
  color: ${({ isActive, theme }) => {
    return isActive ? theme.colors.redOrange : theme.colors.grayBrown;
  }};
`;
const ActiveMarker = styled.div`
  position: absolute;
  border-bottom: 2px solid ${({ theme }) => theme.colors.redOrange};
  width: 100%;
  bottom: -2px;
  right: 0px;
`;
export default TabItem;
