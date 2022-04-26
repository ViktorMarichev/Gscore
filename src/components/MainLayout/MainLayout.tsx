import React, { useEffect, useRef, useState } from "react";
import Container from "src/components/Container";
import styled from "styled-components";
import HeaderContainer from "src/components/HeaderContainer";
import Footer from "src/components/Footer";
import useResizeObserver from "use-resize-observer";
import Curtain from "src/components/Curtain";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSmall, setIsSmal] = useState(false);
  const [curtain, setCurtain] = useState(false);
  const { ref, width } = useResizeObserver({
    onResize: ({ width, height }) => {
      if (width! <= 640) {
        setIsSmal(true);
      } else {
        setIsSmal(false);
      }
    },
  });
  const toggleCurtainHandler = () => {
    setCurtain((prev) => !prev);
  };

  return (
    <MainLayoutWrapper>
      <Container>
        <HeaderContainer
          isSmall={isSmall}
          toggleCurtain={toggleCurtainHandler}
        />
        <main ref={ref}>{children}</main>
        <Footer />
      </Container>
      {curtain && isSmall ? (
        <CurtainWrapper
          onClick={() => {
            setCurtain(false);
          }}
        >
          <Curtain toggleCurtain={toggleCurtainHandler} />
        </CurtainWrapper>
      ) : null}
    </MainLayoutWrapper>
  );
};
const MainLayoutWrapper = styled.div`
  position: relative;
`;

const CurtainWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  top: 0px;
  background: rgba(0, 0, 0, 0.589);
`;

export default MainLayout;
