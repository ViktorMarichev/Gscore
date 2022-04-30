import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Settings from "src/svg/Settings";
import LogOut from "src/svg/LogOut";
import { useAppDispatch } from "src/redux/store";
import { logOut } from "src/redux/User";

type MenuProps = {
  closeHandler: () => void;
  usernameWrapperRef: React.RefObject<HTMLDivElement>;
};

const Menu: React.FC<MenuProps> = ({ closeHandler, usernameWrapperRef }) => {
  const dispatch = useAppDispatch();
  const logOutHandler = () => {
    dispatch(logOut({}));
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) =>
      menuRef.current?.contains(e.target as Node) ||
      usernameWrapperRef.current?.contains(e.target as Node)
        ? null
        : closeHandler();
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <Wrapper ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <Link href="/settings">
        <ItemLink>
          <ImageWrapper>
            <Settings />
          </ImageWrapper>
          <Title>Settings</Title>
        </ItemLink>
      </Link>

      <Item onClick={logOutHandler}>
        <ImageWrapper>
          <LogOut />
        </ImageWrapper>
        <Title>Logout</Title>
      </Item>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.signalBlack};
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
  cursor: pointer;
`;
const ItemLink = styled.a`
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
  cursor: pointer;
`;

const Title = styled.div`
  font-family: "THICCCBOI-medium";
  font-style: normal;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
`;
const ImageWrapper = styled.div`
  padding-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Menu;
