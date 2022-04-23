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
      <Container>
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
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  border-top: 1px solid #393939;
`;
const FooterTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #393939;
  padding-top: 69.54px;
  padding-bottom: 60px;
`;
const Request = styled.div`
  font-family: "Inter-medium";
  font-size: 18px;
  color: #c7c7c7;
  max-width: 322px;
  padding-top: 33.59px;
`;
const FooterBottom = styled.div`
  padding: 44px 0px 42px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CopyRight = styled.div`
  font-family: "Inter-medium";
  font-size: 18px;
  color: #c7c7c7;
`;
const White = styled.span`
  color: white;
`;
const Links = styled.div`
  display: flex;
`;
const LinkWrapper = styled.div`
  margin-left: 27.09px;
`;
export default Footer;
