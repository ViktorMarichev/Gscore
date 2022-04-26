import { useState } from "react";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import styled from "styled-components";
import Container from "src/components/Container";
import MainLayout from "src/components/MainLayout";
import Tabs from "src/components/Tabs";
import TabItem from "src/components/TabItem";
import { wrapper } from "src/redux/store";
import PersonalInfoForm from "src/components/PersonalInfoForm";
import ChangePasswordForm from "src/components/ChangePasswordForm";
const Settings: NextPage = () => {
  const [activeTab, setActiveTab] = useState("Personal info");

  const setActiveTabHandler = (activeTab: string) => {
    setActiveTab(activeTab);
  };

  return (
    <Container>
      <Head>
        <title>Settings</title>
      </Head>
      <MainLayout>
        <TopContainer>
          <Title>Settings</Title>
        </TopContainer>
        <Tabs>
          <TabItem
            title="Personal info"
            activeTab={activeTab}
            onClick={setActiveTabHandler}
          />
          <TabItem
            title="Change password"
            activeTab={activeTab}
            onClick={setActiveTabHandler}
          />
        </Tabs>
        <FormWrapper>
          {activeTab === "Personal info" ? (
            <PersonalInfoForm />
          ) : (
            <ChangePasswordForm />
          )}
        </FormWrapper>
      </MainLayout>
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      if (!store.getState().user.token) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      } else {
        return { props: {} };
      }
    }
  );
const FormWrapper = styled.div`
  margin-left: 0;
  max-width: 512px;
  margin-top: 48px;
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 54px;
  line-height: 64px;
  color: #ffffff;
`;
const TopContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 44px;
`;
export default Settings;
