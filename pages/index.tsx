import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import PrimaryButton from "@components/PrimaryButton";
import SecondaryButton from "@components/SecondaryButton";
import InputField from "@components/InputField";
import CheckBox from "@components/CheckBox";
import Tabs from "@components/Tabs";
import Stages from "@components/Stages";
import TabItem from "@components/TabItem";
import HeaderContainer from "@components/HeaderContainer";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import StageItem from "@components/StageItem";
import SubscriptionsContainer from "@components/SubscriptionsContainer";
import Container from "@components/Container";
import Footer from "@components/Footer";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
const UIKitWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #181818;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
`;
const UiKitColumn = styled.div`
  width: auto;
  box-sizing: border-box;
  margin-left: 5px;
`;
interface IFormInputs {
  firstName: string;
}
const Home: NextPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      firstName: "",
    },
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Profile");
  const [stages, setStages] = useState(["Create account", "Log in"]);
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    alert("send " + JSON.stringify(data));
  };
  const clickTabHandler = (title: string) => {
    setActiveTab(title);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UIKitWrapper>
        <UiKitColumn>
          <PrimaryButton
            onClick={() => {
              alert("action");
            }}
            title="g"
            loading={false}
            disabled={false}
            tabindex={1}
          />
        </UiKitColumn>
        <UiKitColumn>
          <SecondaryButton onClick={()=>{

            alert('action too')
          }} title="Default" loading={false} disabled={false} tabindex={2}/>
        </UiKitColumn>
        <UiKitColumn>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <InputField
                    name="firstName"
                    disabled={false}
                    placeholder="Placeholder"
                    onChange={onChange}
                    onBlur={onBlur}
                    errors={errors}
                    success={errors.firstName === undefined}
                    errorRender={() => {
                      switch (errors.firstName!.type) {
                        case "required":
                          return "This field is required";
                        case "minLength":
                          return "Too short";
                        default:
                          return "some error";
                      }
                    }}
                    value={value}
                    error="Some error"
                  />
                );
              }}
            />
          </form>
        </UiKitColumn>
        <UiKitColumn>
          <CheckBox
            checked={checked}
            disabled={false}
            tabindex={3}
            onClick={() => setChecked((prev) => !prev)}
          />
        </UiKitColumn>
        <UiKitColumn>
          <Tabs>
            <TabItem
              onClick={clickTabHandler}
              title="Profile"
              activeTab={activeTab}
            />
            <TabItem
              onClick={clickTabHandler}
              title="Subscriptions"
              activeTab={activeTab}
            />
            <TabItem
              onClick={clickTabHandler}
              title="Change password"
              activeTab={activeTab}
            />
          </Tabs>
        </UiKitColumn>
        <UiKitColumn>
          <Stages>
            <StageItem title="Create account" stages={stages} />
            <StageItem title="Log in" stages={stages} />
            <StageItem title="Checkout" stages={stages} />
          </Stages>
        </UiKitColumn>
      </UIKitWrapper>
      <UIKitWrapper>
        <HeaderContainer />
      </UIKitWrapper>
      <UIKitWrapper>
        <Container>
          <SubscriptionsContainer />
        </Container>
      </UIKitWrapper>
      <UIKitWrapper>
        <Footer />
      </UIKitWrapper>
    </div>
  );
};

export default Home;
