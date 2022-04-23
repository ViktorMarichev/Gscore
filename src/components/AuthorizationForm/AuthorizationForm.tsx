import React from "react";
import styled from "styled-components";
import InputField from "src/components/InputField";
import PrimaryButton from "src/components/PrimaryButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { UserEndpoints } from "src/redux/api/user";
import { login } from "src/redux/User";
import { AxiosError, AxiosResponse } from "axios";
import { useAppDispatch } from "src/redux/store";

interface IFormInputs {
  email: string;
  password: string;
}

const AuthorizationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Log in</Title>
        <InputWrapper>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^\S+@\S+$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <InputField
                  name="email"
                  disabled={false}
                  placeholder="Email"
                  onChange={onChange}
                  onBlur={onBlur}
                  errors={errors}
                  success={!errors.email && value != ""}
                  errorRender={() => {
                    switch (errors.email!.type) {
                      case "required":
                        return "This field is required";
                      case "pattern":
                        return "Doesn't look like an email";
                      default:
                        return "some error";
                    }
                  }}
                  value={value}
                />
              );
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: 5,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <InputField
                  name="password"
                  disabled={false}
                  placeholder="Password"
                  onChange={onChange}
                  onBlur={onBlur}
                  errors={errors}
                  success={!errors.password && value != ""}
                  errorRender={() => {
                    switch (errors.password!.type) {
                      case "required":
                        return "This field is required";
                      case "minLength":
                        return "Too short";
                      default:
                        return "some error";
                    }
                  }}
                  value={value}
                />
              );
            }}
          />
        </InputWrapper>
        <ButtonWrapper>
          <PrimaryButton title="Log in" />
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
const InputWrapper = styled.div`
  margin-bottom: 24px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 24px;
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 44px;
  line-height: 54px;
  color: #ffffff;
  padding-bottom: 32px;
  margin-top: 64px;
`;
const Hint = styled.div`
  font-family: "THICCCBOI-regular";
  font-size: 14px;
  line-height: 24px;
  padding-bottom: 32px;
  color: #ffffff;
`;
const NoticeBox = styled.div`
  margin-top: 48px;
  display: flex;
`;
const Notice = styled.div`
  font-family: "THICCCBOI-regular";
  font-style: normal;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
`;
const Ref = styled(Notice)`
  color: #fc5842;
  margin-left: 8px;
`;
export default AuthorizationForm;
