import React from "react";
import styled from "styled-components";
import InputField from "@components/InputField";
import PrimaryButton from "@components/PrimaryButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  username: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Create account</Title>
        <Hint>
          You need to enter your name and email. We will send you a temporary
          password by email
        </Hint>
        <InputWrapper>
          <Controller
            name="username"
            control={control}
            rules={{
              required: true,
              minLength: 5,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <InputField
                  name="username"
                  disabled={false}
                  placeholder="Username"
                  onChange={onChange}
                  onBlur={onBlur}
                  errors={errors}
                  success={!errors.username && value != ""}
                  errorRender={() => {
                    switch (errors.username!.type) {
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
          <PrimaryButton title="Send password" />
        </ButtonWrapper>
        <NoticeBox>
          <Notice>Have an account?</Notice>
          <Ref>Go to the next step</Ref>
        </NoticeBox>
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
  padding-bottom: 16px;
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
export default RegistrationForm;
