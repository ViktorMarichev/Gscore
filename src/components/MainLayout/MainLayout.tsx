import React from "react";
import styled from "styled-components";
import HeaderContainer from "src/components/HeaderContainer";
import Footer from "src/components/Footer";
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
