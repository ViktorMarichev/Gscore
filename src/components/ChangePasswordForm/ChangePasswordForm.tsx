import React from "react";
import styled from "styled-components";
import InputField from "src/components/InputField";
import PrimaryButton from "src/components/PrimaryButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { UserEndpoints } from "src/redux/api/user";
import { useAppSelector } from "src/redux/store";
import { UserSelectors } from "src/redux/User";
import { AxiosError, AxiosResponse } from "axios";

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
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const user = useAppSelector((state) => UserSelectors.userData(state));
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
            rules={{
              required: true,
              minLength: 5,
            }}
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
                  errorRender={(error) => {
                    switch (errors.currentPassword!.type) {
                      case "required":
                        return "This field is required";
                      case "minLength":
                        return "Too short";
                      case "customError":
                        return error.message!;
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
            name="newPassword"
            control={control}
            rules={{
              required: true,
            }}
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
                  errorRender={(error) => {
                    switch (errors.newPassword!.type) {
                      case "required":
                        return "This field is required";
                      case "customError":
                        return error.message!;
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
