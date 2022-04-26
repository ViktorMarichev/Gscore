import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Container from "src/components/Container";
import HeaderContainer from "src/components/HeaderContainer";
import Footer from "src/components/Footer";
import useResizeObserver from "use-resize-observer";
import Curtain from "src/components/Curtain";
import { useRouter } from "next/router";
import { UserSelectors } from "src/redux/User";
import { useAppSelector } from "src/redux/store";
type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSmall, setIsSmal] = useState(false);
  const [curtain, setCurtain] = useState(false);
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const availablePaths = ["/", "/subscribing/[id]"];

  const router = useRouter();
  useEffect(() => {
    if (user.token === null && !availablePaths.includes(router.pathname)) {
      router.replace("/");
    }
  }, [user]);

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
  z-index: 20;
  background: rgba(0, 0, 0, 0.589);
`;

export default MainLayout;
