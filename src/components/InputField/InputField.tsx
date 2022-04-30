import React from "react";
import styled from "styled-components";
import Check from "src/svg/Check";
import Close from "src/svg/Close";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorOption } from "react-hook-form";
import { theme } from "src/Theme";

type InputProps = {
  disabled: boolean;
  placeholder: string;
  success?: boolean;
  error?: string;
  value?: string;
  errorRender: (error: ErrorOption) => string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  errors?: any;
};

const Input: React.FC<InputProps> = ({
  disabled,
  placeholder,
  success,
  error,
  errors,
  onChange,
  onBlur,
  errorRender,
  value,
  name,
}) => {
  return (
    <Container>
      <InputWrapper>
        {disabled ? <InputCover /> : null}
        {success ? (
          <SvgWrapper>
            <Check width={18} height={18} color={theme.colors.jade} />
          </SvgWrapper>
        ) : null}
        {errors[name] && !success ? (
          <SvgWrapper>
            <Close color={theme.colors.orangeDawn} />
          </SvgWrapper>
        ) : null}
        <Field
          placeholder={placeholder}
          success={success}
          onChange={onChange}
          onBlur={onBlur}
          error={errors[name]}
          value={value}
          disabled={disabled}
        />
      </InputWrapper>
      <Message>
        <ErrorMessage errors={errors} name={name} render={errorRender} />
      </Message>
    </Container>
  );
};

type FieldProps = {
  success: boolean | undefined;
  error: string | undefined;
};

const Container = styled.div``;
const InputWrapper = styled.div`
  position: relative;
`;
const InputCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #2e2e2e83;
  border-radius: 6px;
  z-index: 5;
`;
const Field = styled.input<FieldProps>`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  color: black;
  border: ${({ success, error, theme }) => {
    if (success) {
      return "1px solid " + theme.colors.jade;
    } else if (error) {
      return "1px solid " + theme.colors.orangeDawn;
    } else {
      return "1px solid " + theme.colors.lightGray;
    }
  }};
  box-sizing: border-box;
  box-shadow: 0px 2px 12px rgba(20, 20, 43, 0.06);
  border-radius: 6px;
  outline: none;
  padding: 15px 43px 15px 13px;
  font-family: "THICCCBOI-regular";
  font-size: 16px;
  &:hover,
  &:active {
    outline: 0;
    outline-offset: 0;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.pearlLightGray};
    font-family: "THICCCBOI-regular";
    font-size: 16px;
  }
`;
const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 50%;
  right: 24.16px;
  margin-top: -0.625em;
`;
const Message = styled.div`
  font-family: "THICCCBOI-medium";
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.orangeDawn};
  padding-top: 2px;
`;
export default Input;
