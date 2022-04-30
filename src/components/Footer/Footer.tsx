import React from "react";
import styled from "styled-components";
import Container from "src/components/Container";
import Logo from "src/svg/Logo";
import Facebook from "src/svg/Facebook";
import LinkedIn from "src/svg/LinkedIn";
import Twitter from "src/svg/Twitter";

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <FooterTop>
        <Logo />
        <Request>
          Ut enim ad minim veniam quis nostrud exercitation ea commodo
        </Request>
      </FooterTop>
      <FooterBottom>
        <CopyRight>
          Copyright © 2022 GScore | All Rights Reserved
          <White>| Cookies | Privacy</White>
          Policy
        </CopyRight>
        <Links>
          <LinkWrapper>
            <Facebook />
          </LinkWrapper>
          <LinkWrapper>
            <Twitter />
          </LinkWrapper>
          <LinkWrapper>
            <LinkedIn />
          </LinkWrapper>
        </Links>
      </FooterBottom>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.grayBrown};
  margin-top: 120px;

  @media (max-width: 640px) {
    margin-top: 60px;
  }
`;
const FooterTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayBrown};
  padding-top: 69.54px;
  padding-bottom: 60px;
`;
const Request = styled.div`
  font-family: "Inter-medium";
  font-size: 18px;
  color: ${({ theme }) => theme.colors.silver};
  max-width: 322px;
  padding-top: 33.59px;

  @media (max-width: 640px) {
    font-family: "THICCCBOI-regular";
    font-style: normal;
    font-size: 18px;
    line-height: 30px;
  }
`;
const FooterBottom = styled.div`
  padding: 44px 0px 42px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: center;
    padding: 32px 0px 30px 0px;
  }
`;
const CopyRight = styled.div`
  font-family: "Inter-medium";
  font-size: 18px;
  color: ${({ theme }) => theme.colors.silver};

  @media (max-width: 640px) {
    font-family: "THICCCBOI-regular";
    line-height: 30px;
    padding-bottom: 24px;
    text-align: center;
  }
`;
const White = styled.span`
  color: white;
`;
const Links = styled.div`
  display: flex;
`;
const LinkWrapper = styled.div`
  @media (max-width: 640px) {
    margin: 0px;
    padding-left: 10.64px;
    padding-right: 10.64px;
  }
  margin-left: 27.09px;
`;
export default Footer;
