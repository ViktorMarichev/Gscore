import React from "react";
import styled from "styled-components";
import CheckBox from "@components/CheckBox";
import Copy from "@svg/Copy";
import SecondaryButton from "@components/SecondaryButton";
import StatusLabelComponent from "@components/StatusLabel";
type CodeViewProps = {
  checked: boolean;
  ChangeChacked: () => void;
};

const CodeView: React.FC<CodeViewProps> = ({ checked, ChangeChacked }) => {
  return (
    <Wrapper>
      <CheckBoxWrapper>
        <CheckBox disabled={false} checked={checked} onClick={ChangeChacked} />
      </CheckBoxWrapper>
      <LicenseCodeLabel>License Code</LicenseCodeLabel>
      <CodeInputWrapper>
        <CopyWrapper>
          <Copy />
        </CopyWrapper>

        <CodeInput />
      </CodeInputWrapper>
      <DomainLabel>Domain</DomainLabel>
      <DomainInputWrapper>
        <Input />
      </DomainInputWrapper>

      <ButtonWrapper>
        <SecondaryButton title="Activate" />
      </ButtonWrapper>
      <StatusLabel>Status</StatusLabel>
      <StatusWrapper>
        <Status status="ACTIVE">Active</Status>
      </StatusWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1268px;
  display: grid;
  grid-template-columns: 1fr 3fr 4fr 1fr 1fr;
  grid-template-rows: 20% 80%;
  grid-template-areas:
    ". codelabel domainlabel . statuslabel"
    "checkbox codeinput domaininput button status ";
  background: #272727;
  border-radius: 12px;
  width: 100%;
  padding: 24px 0px 31px 0px;
`;
const Label = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 16px;
  color: #969696;
  margin-bottom: 12px;
`;
const LicenseCodeLabel = styled(Label)`
  grid-area: codelabel;
`;
const DomainLabel = styled(Label)`
  grid-area: domainlabel;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const CheckBoxWrapper = styled.div`
  grid-area: checkbox;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Inputs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  grid-area: button;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 56px;
  padding-right: 56px;
`;
const CodeInputWrapper = styled(ContentWrapper)`
  grid-area: codeinput;
  margin-right: 28px;
`;
const DomainInputWrapper = styled(ContentWrapper)`
  grid-area: domaininput;
`;
const StatusWrapper = styled(ContentWrapper)`
  height: 100%;
  grid-area: status;
`;
const StatusLabel = styled(Label)`
  grid-area: statuslabel;
`;
const Input = styled.input`
  border: none;
  background: #393939;
  box-shadow: 0px 2px 12px rgba(20, 20, 43, 0.06);
  padding: 25px 24px 25px 24px;
  border-radius: 6px;
  outline: none;
  &:hover,
  &:active {
    outline: 0;
    outline-offset: 0;
  }
`;
const Status = styled(StatusLabelComponent)``;
const CopyWrapper = styled.div`
  position: absolute;
  right: 29px;
`;
const CodeInput = styled(Input)`
  padding-right: 39px;
`;

export default CodeView;
