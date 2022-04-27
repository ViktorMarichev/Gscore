import React from "react";
import styled from "styled-components";
import InputField from "src/components/InputField";
import PrimaryButton from "src/components/PrimaryButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { UserEndpoints } from "src/redux/api/user";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { UserSelectors, updatePersonalData } from "src/redux/User";
import { AxiosError, AxiosResponse } from "axios";

type IFormInputs = {
  username: string;
  email: string;
};

const PersonalInfoForm: React.FC = () => {
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const dispatch = useAppDispatch();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    UserEndpoints.updatePersonalData({
      token: user.token!,
      email: data.email,
      username: data.username,
    })
      .then((res: AxiosResponse) => {
        const { email, username } = res.data;
        dispatch(updatePersonalData({ email, username }));
        reset({
          email: "",
          username: "",
        });
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert(err.message);
        }
      });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Personal info</Title>
        <InputWrapper>
          <Controller
            name="username"
            control={control}
            rules={{
              required: true,
              minLength: 5,
              maxLength: 15,
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
                  errorRender={(error) => {
                    switch (errors.username!.type) {
                      case "required":
                        return "This field is required";
                      case "minLength":
                        return "Too short";
                      case "maxLength":
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
                  errorRender={(error) => {
                    switch (errors.email!.type) {
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

export default PersonalInfoForm;
