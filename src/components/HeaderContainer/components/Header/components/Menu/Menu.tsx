import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Settings from "src/svg/Settings";
import LogOut from "src/svg/LogOut";
import { useAppDispatch } from "src/redux/store";
const Menu: React.FC = () => {
  return (
    <Wrapper>
      <Link href="/settings">
        <ItemLink>
        <ImageWrapper>
          <Settings />
        </ImageWrapper>
        <Title>Settings</Title>
        </ItemLink>
      </Link>

        <ImageWrapper>
          <LogOut />
        </ImageWrapper>
        <Title>Logout</Title>
      </Item>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #272727;
  border-radius: 12px;
  width: 188px;
  padding: 4px 24px 4px 24px;
`;
const Item = styled.div`
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
const Title = styled.div`
  font-family: "THICCCBOI-medium";
  font-style: normal;
  font-size: 20px;
  color: #ffffff;
`;
const ImageWrapper = styled.div`
  padding-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Menu;
