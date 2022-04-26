import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "src/svg/Logo";
import ArrowButton from "src/svg/ArrowButton";
import Menu from "./components/Menu";

type HeaderProps = {
  username?: string;
  isLogin: boolean;
  aMenuIsOpen: boolean;
  toggleMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({
  username,
  isLogin,
  aMenuIsOpen,
  toggleMenu,
}) => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <HeaderEnd>
        {isLogin ? (
          <>
            <CurrentPage>
              <Link href="/my-subscriptions">
                <a>My subscriptions</a>
              </Link>
            </CurrentPage>
            <UserBox>
              <Username>{username}</Username>
              <ArrowWrapper onClick={toggleMenu}>
                <ArrowButton
                  style={aMenuIsOpen ? { transform: "rotate(180deg)" } : {}}
                />
              </ArrowWrapper>
              {aMenuIsOpen ? (
                <MenuContainer>
                  <Menu />
                </MenuContainer>
              ) : null}
            </UserBox>
          </>
        ) : null}
      </HeaderEnd>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0px 32px 0px;
`;
const LogoWrapper = styled.div``;
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
  display: flex;
  padding-left: 32px;
  align-items: center;
  height: 100%;
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
  z-index: 5;
  bottom: -175px;
  left: -55px;
`;

const CurrentPage = styled(Username)``;
export default Header;
