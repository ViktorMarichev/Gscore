import React from "react";
import styled from "styled-components";
import Check from "src/svg/Check";
type CheckBoxProps = {
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
  tabindex?: number;
};
const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onClick,
  disabled,
  tabindex,
}) => {
  return (
    <Wrapper
      tabindex={tabindex}
      checked={checked}
      onClick={onClick}
      disabled={!!disabled}
    >
      {disabled ? <CheckBoxCover /> : null}
      {checked ? (
        <Check
          width={20.67}
          height={18.05}
          viewBox={"0 0 28 28"}
          transform="translate(2 3)"
          preserveAspectRatio="xMidYMid meet"
        />
      ) : null}
    </Wrapper>
  );
};
type wrapperProps = {
  disabled: boolean | undefined;
  checked: boolean;
  tabindex?: number;
};
const Wrapper = styled.div.attrs(({ tabindex }: wrapperProps) => ({
  tabIndex: tabindex,
}))`
  position: relative;
  background: ${({ checked }: wrapperProps) => {
    return checked ? "#FC5842" : "#ffffff";
  }};
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 2px 6px rgba(20, 20, 43, 0.06);
  border-radius: 7px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${({ disabled }: wrapperProps) => {
    return disabled ? "none" : "auto";
  }};
  &:hover {
    background: #dc2b2b;
    border-radius: 7px;
  }

  &:focus {
    border: ${({ checked }: wrapperProps) => {
      return checked
        ? " 4px solid rgba(199, 199, 199, 0.3)"
        : "4px solid rgba(252, 88, 66, 0.3)";
    }};
    border-radius: 7px;
    outline: none;
  }
`;
const CheckBoxCover = styled.div`
  position: absolute;
  background: #00000065;
  width: 100%;
  height: 100%;
  z-index: 5;
  border-radius: 7px;
`;
export default CheckBox;
