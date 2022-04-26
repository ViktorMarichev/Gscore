import React from "react";
import styled from "styled-components";

type TabsProps = {
  children: React.ReactNode;
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #393939;

`;
export default Tabs;
