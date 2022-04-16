import React from "react";
import styled from "styled-components";
import Logo from "@svg/Logo";
import ArrowButton from "@svg/ArrowButton";
import Menu from "./components/Menu";

type HeaderProps = {
  username?: string;
  currentPage?: string;
  isLogin: boolean;
  aMenuIsOpen: boolean;
  toggleMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({
  username,
  currentPage,
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
            <CurrentPage>{currentPage}</CurrentPage>
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

  bottom: -175px;
  left: -22px;
`;

const CurrentPage = styled(Username)``;
export default Header;
