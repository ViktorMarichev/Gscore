import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "src/svg/Logo";
import ArrowButton from "src/svg/ArrowButton";
import Menu from "./components/Menu";
import MenuBurger from "src/svg/MenuBurger";
type HeaderProps = {
  username?: string;
  isLogin: boolean;
  isTheMenuOpen: boolean;
  toggleMenu: () => void;
  isSmall: boolean;
  toggleCurtain: () => void;
};

const Header: React.FC<HeaderProps> = ({
  username,
  isLogin,
  isTheMenuOpen,
  toggleMenu,
  isSmall,
  toggleCurtain,
}) => {
  const usernameWrapperRef = useRef<null | HTMLDivElement>(null);
  return (
    <Wrapper>
      <Link href="/" as="/">
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </Link>
      <HeaderEnd>
        {isLogin && !isSmall ? (
          <>
            <CurrentPage>
              <Link href="/my-subscriptions">
                <a>My subscriptions</a>
              </Link>
            </CurrentPage>
            <UserBox>
              <UsernameWrapper ref={usernameWrapperRef} onClick={toggleMenu}>
                <Username>{username}</Username>
                <ArrowWrapper>
                  <ArrowButton
                    style={isTheMenuOpen ? { transform: "rotate(180deg)" } : {}}
                  />
                </ArrowWrapper>
                {isTheMenuOpen ? (
                  <MenuContainer>
                    <Menu
                      closeHandler={toggleMenu}
                      usernameWrapperRef={usernameWrapperRef}
                    />
                  </MenuContainer>
                ) : null}
              </UsernameWrapper>
            </UserBox>
          </>
        ) : null}
      </HeaderEnd>
      {isSmall && isLogin ? (
        <MenuBurgerWrapper onClick={toggleCurtain}>
          <MenuBurger />
        </MenuBurgerWrapper>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0px 32px 0px;
  @media (max-width: 1400px) {
    padding: 20px 16px 20px 16px;
  }
  @media (max-width: 600px) {
  }
`;
const LogoWrapper = styled.a``;
const HeaderEnd = styled.div`
  display: flex;
  align-items: center;
`;
const ArrowWrapper = styled.div`
  position: relative;
  top: -2px;
  margin-left: 12px;
  display: flex;
  align-items: flex-start;
`;
const UserBox = styled.div`
  position: relative;
  padding-left: 32px;
  cursor: default;
`;
const UsernameWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  &:active {
    opacity: 0.5;
  }
`;

const Username = styled.div`
  font-family: "THICCCBOI-medium";
  align-self: flex-end;
  font-size: 20px;
  font-style: normal;
  color: white;
`;
const MenuContainer = styled.div`
  position: absolute;
  z-index: 8;
  bottom: -175px;
  left: -55px;
`;
const MenuBurgerWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const CurrentPage = styled(Username)``;
export default Header;
