import React from "react";
import styled from "styled-components";
import HeaderContainer from "@components/HeaderContainer";
import Footer from "@components/Footer";
type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
