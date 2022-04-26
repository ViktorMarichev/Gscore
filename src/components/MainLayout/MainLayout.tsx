import React, { useEffect } from "react";
import styled from "styled-components";
import HeaderContainer from "src/components/HeaderContainer";
import Footer from "src/components/Footer";
import { useRouter } from "next/router";
import { UserSelectors } from "src/redux/User";
import { useAppSelector } from "src/redux/store";
type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const availablePaths = ["/", "/subscribing/[id]"];

  const router = useRouter();
  useEffect(() => {
    if (user.token === null && !availablePaths.includes(router.pathname)) {
      router.replace("/");
    }
  }, [user]);

  return (
    <>
      <HeaderContainer />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
