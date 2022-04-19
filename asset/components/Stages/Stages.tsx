import React from "react";
import styled from "styled-components";

type StagesProps = {
  children: React.ReactNode;
};

const Stages: React.FC<StagesProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export default Stages;
