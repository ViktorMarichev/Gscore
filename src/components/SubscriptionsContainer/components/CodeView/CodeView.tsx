import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CheckBox from "src/components/CheckBox";
import Copy from "src/svg/Copy";
import SecondaryButton from "src/components/SecondaryButton";
import StatusLabelComponent from "src/components/StatusLabel";
import { CheckCode, CodesSelectors, updateCodeById } from "src/redux/Codes";
import { UserSelectors } from "src/redux/User";
import { useAppSelector, useAppDispatch } from "src/redux/store";
import { Codes } from "src/redux/api/codes";
import { AxiosResponse, AxiosError } from "axios";

type CodeViewProps = {
  id: number;
  checked: boolean;
  ChangeChacked: () => void;
  status: string;
  origin: string;
  code: string;
};

const CodeView: React.FC<CodeViewProps> = ({
  id,
  checked,
  ChangeChacked,
  status,
  origin,
  code,
}) => {
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const ucFirst = (str: string) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };

  const activateButtonHandler = () => {
  };
  const dispatch = useAppDispatch();
  const [domainInput, setDomainInput] = useState(origin);
  const isChecked = useAppSelector((state) =>
    CodesSelectors.checkCodeById(state, id)
  );
  return (
    <Wrapper $status={status}>
      <CheckBoxWrapper>
        <CheckBox
          disabled={status !== "HOLD"}
          checked={isChecked != -1}
          onClick={changeChecked}
        />
      </CheckBoxWrapper>
      <LicenseCodeLabel>License Code</LicenseCodeLabel>
      <CodeInputWrapper>
        <CopyWrapper>
          <Copy />
        </CopyWrapper>

        <CodeInput value={code} />
      </CodeInputWrapper>
      <DomainLabel>Domain</DomainLabel>
      <DomainInputWrapper>
        <Input value={domainInput} />
      </DomainInputWrapper>
      {status === "INACTIVE" ? (
      <ButtonWrapper>
          <SecondaryButton title="Activate" onClick={activateButtonHandler} />
      </ButtonWrapper>
      ) : null}

      <StatusLabel>Status</StatusLabel>
      <StatusWrapper>
        <Status $status={status}>{ucFirst(status)}</Status>
      </StatusWrapper>
    </Wrapper>
  );
};

type WrapperType = {
  $status: string;
};

const Wrapper = styled.div<WrapperType>`
  max-width: 1268px;
  display: grid;
  grid-template-columns: 2fr 5fr 6fr ${({ $status }) => {
      return $status === "INACTIVE" ? "3fr" : "1fr";
    }} 2fr;
  grid-template-rows: 20% 80%;
  grid-template-areas:
    ". codelabel domainlabel . statuslabel"
    "checkbox codeinput domaininput button status ";
  background: #272727;
  border-radius: 12px;
  width: 100%;
  padding: 24px 0px 31px 0px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 2fr 2fr ${({ $status }) => {
        return $status === "INACTIVE" ? "2fr" : "0.5fr";
      }} 1fr;
  }
  @media (max-width: 960px) {
    padding: 32px 20px 32px 20px;
    grid-template-columns: 48px 1fr 2fr;
    grid-template-rows: minmax(52px, auto) auto 1fr auto 1fr;
    grid-template-areas:
      "checkbox status button"
      "codelabel codelabel ."
      "codeinput codeinput codeinput"
      "domainlabel domainlabel ."
      "domaininput domaininput domaininput";
  }
`;
const Label = styled.div`
  font-family: "THICCCBOI-bold";
  font-size: 16px;
  color: #969696;
  margin-bottom: 12px;
`;
const LicenseCodeLabel = styled(Label)`
  grid-area: codelabel;
  @media (max-width: 960px) {
    margin-top: 8px;
  }
`;
const DomainLabel = styled(Label)`
  grid-area: domainlabel;
  @media (max-width: 960px) {
    margin-top: 24px;
  }
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
  padding-left: calc(0px + (56 - 0) * ((100vw - 375px) / (1440 - 375)));
  padding-right: calc(0px + (56 - 0) * ((100vw - 375px) / (1440 - 375)));
  @media (max-width: 960px) {
    justify-content: flex-end;
  }
`;
const CodeInputWrapper = styled(ContentWrapper)`
  grid-area: codeinput;
  margin-right: 28px;

  @media (max-width: 960px) {
    margin-right: 0px;
  }
`;
const DomainInputWrapper = styled(ContentWrapper)`
  grid-area: domaininput;
`;
const StatusWrapper = styled(ContentWrapper)`
  height: 100%;
  grid-area: status;
  @media (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const StatusLabel = styled(Label)`
  grid-area: statuslabel;
  grid-column: 4fr;

  @media (max-width: 960px) {
    display: none;
  }
`;
const Input = styled.input`
  border: none;
  background: #393939;
  box-shadow: 0px 2px 12px rgba(20, 20, 43, 0.06);
  padding: 25px 24px 25px 24px;
  border-radius: 6px;
  font-family: "THICCCBOI-regular";
  font-style: normal;
  font-size: 16px;
  line-height: 18px;
  color: #969696;
  outline: none;
  &:hover,
  &:active {
    outline: 0;
    outline-offset: 0;
  }
`;
const Status = styled(StatusLabelComponent)`
  color: ${({ $status }: { $status: string }) => {
    switch ($status) {
      case "ACTIVE":
        return "#05C168";
      case "HOLD":
        return "#FF9E2C";
      case "INACTIVE":
        return "#FF5A65";
      default:
        return "#05C168";
    }
  }};
`;
const CopyWrapper = styled.div`
  position: absolute;
  right: 29px;
`;
const CodeInput = styled(Input)`
  text-overflow: ellipsis;
  padding-right: 75px;
`;

export default CodeView;
