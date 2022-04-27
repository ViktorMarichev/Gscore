import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import MainLayout from "src/components/MainLayout";
import Container from "src/components/Container";
import styled from "styled-components";
import ProductView from "src/components/ProductView";
import { AxiosResponse, AxiosError } from "axios";
import { Products as ProductsApi } from "src/redux/api/products";
import { Subscribes } from "src/redux/api/subscribes";
import ProductType from "src/types/product";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { wrapper } from "src/redux/store";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { setProducts } from "src/redux/Products";
import { SubscribesSelectors } from "src/redux/Subscribes";
import { ResizePlugin } from "src/sliderPlugins";
import { UserSelectors } from "src/redux/User";
import Product from "src/types/product";

type ProductsPageProps = {
  serverProducts: Array<ProductType>;
  props: any;
};

const ProductsPage: NextPage<ProductsPageProps> = ({ serverProducts }) => {
  const dispatch = useAppDispatch();
  const [products, setProductsState] = useState<Array<Product>>(serverProducts);
  const currentSubscription = useAppSelector((state) =>
    SubscribesSelectors.getCurrentSubscribe(state)
  );
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const router = useRouter();

  const [refCallback, slider] = useKeenSlider(
    {
      initial: 0,
      created: (slider) => {
        if (slider.container.offsetWidth <= 960) {
          slider.options.disabled = false;
        }
      },
      loop: false,
      disabled: true,
      mode: "free-snap",
      breakpoints: {
        "(max-width: 960px)": {
          disabled: false,
          slides: {
            origin: "center",
            perView: 1,
          },
          range: {
            min: -1,
            max: 1,
          },
        },
        "(max-width: 780px)": {
          disabled: false,
          slides: {
            origin: "center",
            perView: 1,
          },
          range: {
            min: -1,
            max: 1,
          },
        },
      },
    },
    [
      (slider) => {
        if (typeof window != "undefined") {
          let timeout: ReturnType<typeof setTimeout>;
          let mouseOver = false;
          function clearNextTimeout() {
            clearTimeout(timeout);
          }
          function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;

            timeout = setTimeout(() => {
              if (slider.track.details?.abs === 1) {
                slider.moveToIdx(-1);
              } else {
                try {
                  slider.next();
                } catch {}
              }
            }, 2500);
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false;
              nextTimeout();
            });

            nextTimeout();
          });
          slider.on("dragStarted", clearNextTimeout);
          slider.on("animationEnded", nextTimeout);
          slider.on("updated", nextTimeout);
        }
      },
      ResizePlugin,
    ]
  );

  useEffect(() => {
    async function loadProducts() {
      try {
        const res: AxiosResponse = await ProductsApi.getProducts();
        const data = res.data;
        setProductsState(data);
        dispatch(setProducts({ products: data }));
      } catch {
        loadProducts();
      }
    }
    if (!currentSubscription) {
      router.replace("/my-subscriptions");
    }
    if (serverProducts.length === 0) {
      loadProducts();
    } else {
      dispatch(setProducts({ products }));
    }
  }, []);

  const selectProductHandler = (id: number) => {
    Subscribes.upgradeSubscribe({
      productId: id,
      subscribeId: currentSubscription!.id,
      token: user.token!,
    })
      .then((res: AxiosResponse) => {
        router.replace("my-subscriptions");
      })
      .catch((err: AxiosError) => {
        if (err.response) alert(JSON.stringify(err.response.data.message));
        else {
          alert(err.message);
        }
      });
  };

  if (!products) {
    return (
      <>
        <Head>
          <title>Upgrade your subscription!</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Wrapper>
            <Title>Upgrade your subscription!</Title>
            Loading...
          </Wrapper>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Upgrade your subscription!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Wrapper>
          <Title>Upgrade your subscription!</Title>
          <Products ref={refCallback} className="keen-slider">
            {products.map((product: ProductType, index) => {
              return (
                <ProductViewWrapper
                  key={product.id}
                  className="keen-slider__slide"
                >
                  <ProductView
                    isActive={index == 1}
                    price={Number(product.prices[0].price)}
                    id={product.id}
                    name={product.name}
                    sitesCount={product.sitesCount}
                    disabled={
                      (currentSubscription
                        ? currentSubscription!.productId
                        : null) === product.id
                    }
                    selectProduct={() => {
                      selectProductHandler(product.id);
                    }}
                  />
                </ProductViewWrapper>
              );
            })}
          </Products>

          <Notice>
            Have more than 10 sites?
            <Ref>Contact us</Ref>
          </Notice>
        </Wrapper>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((state) => async (context) => {
    console.log("getServerrSideProps", state.getState().subscribes);
    if (!state.getState().user.token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      try {
        const res: AxiosResponse = await ProductsApi.getProducts();
        const data = res.data;
        return { props: { serverProducts: data } };
      } catch (error) {
        console.log("error.message");
        return { props: { serverProducts: [] } };
      }
    }
  });
const Wrapper = styled.div`
  padding: 16px 0px 42px 0px;
  @media (max-width: 960px) {
  }
`;
const Title = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 44px;
  color: #ffffff;
  width: 100%;
  text-align: center;
  padding-bottom: 98.23px;
  @media (max-width: 640px) {
    padding-bottom: 48.23px;
  }
`;
const Products = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProductViewWrapper = styled.div`
  padding-right: calc(10px + (12.5 - 10) * ((100vw - 375px) / (1440 - 375)));
  padding-left: calc(10px + (12.5 - 10) * ((100vw - 375px) / (1440 - 375)));
  overflow: visible;
  @media (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 640px) {
    padding-right: 0px;
    padding-left: 0px;
  }
`;
const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "THICCCBOI-medium";
  font-size: 18px;
  color: #ffffff;
  @media (max-width: 960px) {
    padding-top: 15px;
  }
`;
const Ref = styled.div`
  text-decoration-line: underline;
  margin-top: 1px;
  color: #fc5842;
  line-height: 30px;
`;
export default ProductsPage;
