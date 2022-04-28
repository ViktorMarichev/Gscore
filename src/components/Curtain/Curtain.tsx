import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Settings from "src/svg/Settings";
import LogOut from "src/svg/LogOut";
import ArrowButton from "src/svg/ArrowButton";
import Close from "src/svg/Close";
import Logo from "src/svg/Logo";
import { UserSelectors } from "src/redux/User";
import { useAppSelector, useAppDispatch } from "src/redux/store";
import { logOut } from "src/redux/User";
import Link from "next/link";
type CurtainProps = {
  toggleCurtain: () => void;
};
const translate = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const Curtain: React.FC<CurtainProps> = ({ toggleCurtain }) => {
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const [aMenuIsOpen, setAmenu] = useState(false);

  const toggleMenu = () => {
    setAmenu((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  const logOutHandler = () => {
    toggleCurtain();
    dispatch(logOut({}));
  };

  return (
    <>
      <CurtainContainer
        onClick={(e: React.MouseEventHandler<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <CurtainHeader>
          <CurtainClose onClick={toggleCurtain}>
            <Close />
          </CurtainClose>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </CurtainHeader>
        <CurtainDetails>
          <Link href={"/my-subscriptions"}>
            <DetailsItemLink>
              <Title>My subscribtions</Title>
            </DetailsItemLink>
          </Link>
          <DetailsItem>
            <TitleWrapper>
              <Title>{user.username}</Title>

              <ArrowWrapper onClick={toggleMenu}>
                <ArrowButton
                  style={aMenuIsOpen ? { transform: "rotate(180deg)" } : {}}
                />
              </ArrowWrapper>
            </TitleWrapper>
            {aMenuIsOpen ? (
              <CurtainMenu>
                <Link href={"/settings"}>
                  <MenuLink>
                    <ImageWrapper>
                      <Settings color={"#969696"} />
                    </ImageWrapper>
                    <MenuTitle>Settings</MenuTitle>
                  </MenuLink>
                </Link>
                <MenuItem onClick={logOutHandler}>
                  <ImageWrapper>
                    <LogOut color={"#969696"} />
                  </ImageWrapper>
                  <MenuTitle>Logout</MenuTitle>
                </MenuItem>
              </CurtainMenu>
            ) : null}
          </DetailsItem>
        </CurtainDetails>
      </CurtainContainer>
    </>
  );
};

const CurtainContainer = styled.div`
  width: 80%;
  height: 100%;
  transform: translateX(0%);
  animation: 1s ${translate} ease-out;
  background: #272727;
  padding: 0 24px 0 24px;
`;
const CurtainClose = styled.div`
  padding-right: 35px;
`;
const CurtainHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 28px;
`;
const CurtainDetails = styled.div`
  background: #272727;
  border-radius: 12px;
  width: 100%;
`;
const DetailsItem = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 48px 20px 24px 0px;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: 1px solid #393939;
`;
const DetailsItemLink = styled.a`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 48px 20px 24px 0px;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: 1px solid #393939;
`;

const CurtainMenu = styled.div`
  width: 100%;
  padding-top: 31px;
`;
const MenuItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 24px 0px 24px 0px;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const MenuLink = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 24px 0px 24px 0px;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const MenuTitle = styled.div`
  font-family: "THICCCBOI-regular";
  font-size: 16px;
  line-height: 18px;
  color: #969696;
`;
const ImageWrapper = styled.div`
  padding-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-family: "THICCCBOI-medium";
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
`;
const ArrowWrapper = styled.div`
  align-items: center;
  display: flex;
  align-items: flex-start;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LogoWrapper = styled.div`
  width: 130;
  height: 32;
`;
export default Curtain;
