import React from "react";
import styled from "styled-components";
import InputField from "src/components/InputField";
import PrimaryButton from "src/components/PrimaryButton";
import {
  useForm,
  Controller,
  SubmitHandler,
  ErrorOption,
} from "react-hook-form";
import { UserEndpoints } from "src/redux/api/user";
import { useAppSelector } from "src/redux/store";
import { UserSelectors } from "src/redux/User";
import { AxiosError, AxiosResponse } from "axios";
import Constants from "src/constants";

type IFormInputs = {
  currentPassword: string;
  newPassword: string;
};

const ChangePasswordForm: React.FC = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const user = useAppSelector((state) => UserSelectors.userData(state));

  const PasswordErrorRender = (error: ErrorOption) => {
    switch (errors.currentPassword!.type) {
      case "required":
        return "This field is required";
      case "minLength":
        return "Too short";
      default:
        return "some error";
    }
  };
  const NewPasswordErrorRender = (error: ErrorOption) => {
    switch (errors.newPassword!.type) {
      case "required":
        return "This field is required";
      case "minLength":
        return "Too short";
      default:
        return "some error";
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (data.currentPassword != data.newPassword) {
      const { currentPassword, newPassword } = data;
      UserEndpoints.updatePassword({
        currentPassword,
        newPassword,
        token: user.token!,
      })
        .then((res: AxiosResponse) => {
          alert("Done");
          reset({
            newPassword: "",
            currentPassword: "",
          });
        })
        .catch((err: AxiosError) => {
          if (err.response) {
            alert(err.response.data.message);
          } else {
            alert(err.message);
          }
        });
    } else {
      alert("Passwords must be different");
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Change password</Title>
        <InputWrapper>
          <Controller
            name="currentPassword"
            control={control}
            rules={Constants.PasswordInputValidate}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <InputField
                  name="currentPassword"
                  disabled={false}
                  placeholder="Current Password"
                  onChange={onChange}
                  onBlur={onBlur}
                  errors={errors}
                  success={!errors.currentPassword && value != ""}
                  errorRender={PasswordErrorRender}
                  value={value}
                />
              );
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Controller
            name="newPassword"
            control={control}
            rules={Constants.PasswordInputValidate}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <InputField
                  name="newPassword"
                  disabled={false}
                  placeholder="New Password"
                  onChange={onChange}
                  onBlur={onBlur}
                  errors={errors}
                  success={!errors.newPassword && value != ""}
                  errorRender={NewPasswordErrorRender}
                  value={value}
                />
              );
            }}
          />
        </InputWrapper>
        <ButtonWrapper>
          <PrimaryButton
            onClick={() => handleSubmit(onSubmit)()}
            title="Save"
          />
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
  width: 200px;
  @media (max-width: 640px) {
    width: 100%;
  }
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 28px;
  line-height: 40px;
  color: #ffffff;
  padding-bottom: 24px;
`;
const NoticeBox = styled.div`
  margin-top: 48px;
  display: flex;
`;
export default ChangePasswordForm;
