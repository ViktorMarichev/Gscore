import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
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
import { Products } from "@api/products";
import { User } from "@api/user";
import { Subscribes } from "@api/subscribes";
import { Codes } from "@api/codes";
import { useAppDispatch, useAppSelector } from "asset/redux/store";
import Product from "../asset/types/product";
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
  const [products, setProducts] = useState<Array<Product>>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Profile");
  const [stages, setStages] = useState(["Create account", "Log in"]);
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    alert("send " + JSON.stringify(data));
  };
  useEffect(() => {
    if (products.length != 0) {
      alert(JSON.stringify(products));
    }
  }, [products]);
  const getProducts = async () => {
    const { data: products } = await Products.getProducts();
    if (!products.message) {
      setProducts(products);
    }
  };
  const buyProduct = () => {
    Products.buyProduct({
      priceId: 2,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUsImVtYWlsIjoiZmluZ2VyQG1haWwucnUiLCJpYXQiOjE2NTAwMDc5Nzd9.U-QbAJ47N7cvp5rNLC9ggpFRKz-9NEiGvA_iDcHddhA",
    })
      .then((response: AxiosResponse) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error: AxiosError) => {
        if (error.response) alert(JSON.stringify(error.response?.data));
        else alert(error);
      });
  };
  const upgradeSubscribe = () => {
    Subscribes.upgradeSubscribe({
      productId: 1,
      subscribeId: 80,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUsImVtYWlsIjoiZmluZ2VyQG1haWwucnUiLCJpYXQiOjE2NTAwMDc5Nzd9.U-QbAJ47N7cvp5rNLC9ggpFRKz-9NEiGvA_iDcHddhA",
    })
      .then((response: AxiosResponse) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error: AxiosError) => {
        if (error.response) alert(JSON.stringify(error.response?.data));
        else alert(error);
      });
  };

  const createUser = () => {
    User.createAccount({
      email: "finger@mail.ru",
      username: "mouke",
      password: "stinks1234",
    })
      .then((res: AxiosResponse) => {
        alert(res.data);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };

  const getSubscries = () => {
    Subscribes.getSubscribes({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUsImVtYWlsIjoiZmluZ2VyQG1haWwucnUiLCJpYXQiOjE2NTAwMDc5Nzd9.U-QbAJ47N7cvp5rNLC9ggpFRKz-9NEiGvA_iDcHddhA",
    })
      .then((res: AxiosResponse) => {
        alert(JSON.stringify(res.data));
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };
  const releaseHold = () => {
    Codes.releaseHold({
      codesIds: [392, 594, 595],
      subscribeId: 80,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUsImVtYWlsIjoiZmluZ2VyQG1haWwucnUiLCJpYXQiOjE2NTAwMDc5Nzd9.U-QbAJ47N7cvp5rNLC9ggpFRKz-9NEiGvA_iDcHddhA",
    })
      .then((res: AxiosResponse) => {
        alert(JSON.stringify(res.data));
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };
  const activateCode = () => {
    Codes.activate({
      code: "24d2bd9f-44fd-4a5b-88ae-8ab9a13a0be2",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUsImVtYWlsIjoiZmluZ2VyQG1haWwucnUiLCJpYXQiOjE2NTAwMDc5Nzd9.U-QbAJ47N7cvp5rNLC9ggpFRKz-9NEiGvA_iDcHddhA",
    })
      .then((res: AxiosResponse) => {
        alert(JSON.stringify(res.data));
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
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
            onClick={getProducts}
            title="Get products"
            loading={false}
            disabled={false}
            tabindex={1}
          />
        </UiKitColumn>
        <UiKitColumn>
          <SecondaryButton
            onClick={createUser}
            title="Default"
            loading={false}
            disabled={false}
            tabindex={2}
          />
        </UiKitColumn>
        <UiKitColumn>
          <PrimaryButton
            onClick={buyProduct}
            title="Buy product"
            loading={false}
            disabled={false}
            tabindex={1}
          />
        </UiKitColumn>

        <UiKitColumn>
          <SecondaryButton
            onClick={getSubscries}
            title="Get subscribes"
            loading={false}
            disabled={false}
            tabindex={2}
          />
        </UiKitColumn>
        <UiKitColumn>
          <PrimaryButton
            onClick={upgradeSubscribe}
            title="Upgrade subscribe"
            loading={false}
            disabled={false}
            tabindex={1}
          />
        </UiKitColumn>
        <UiKitColumn>
          <SecondaryButton
            onClick={releaseHold}
            title="Take off hold"
            loading={false}
            disabled={false}
            tabindex={2}
          />
        </UiKitColumn>
        <UiKitColumn>
          <PrimaryButton
            onClick={activateCode}
            title="Activate code"
            loading={false}
            disabled={false}
            tabindex={1}
          />
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
