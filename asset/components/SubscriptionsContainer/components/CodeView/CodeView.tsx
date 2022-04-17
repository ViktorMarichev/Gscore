import React from "react";
import styled from "styled-components";
import CheckBox from "@components/CheckBox";
const CodeView: React.FC = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  background: #272727;
  border-radius: 12px;
  width: 100%;
`;
const InputWrapper = styled.div``;
const Input = styled.input`
  background: #393939;
  box-shadow: 0px 2px 12px rgba(20, 20, 43, 0.06);
  border-radius: 6px;
  &:hover,
  &:active {
    outline: 0;
    outline-offset: 0;
  }
`;

export default CodeView;
