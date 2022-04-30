import styled from "styled-components";

type StatusLabelProps = { status: string };

const StatusLabel = styled.div<StatusLabelProps>`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 22px;
  color: ${({ status, theme }) => {
    switch (status) {
      case "ACTIVE":
        return theme.colors.jade;
      case "INACTIVE":
        return theme.colors.orangeDawn;
      case "HOLD":
        return theme.colors.luminousBrightOrange;
      default:
        return theme.colors.jade;
    }
  }};
`;
export default StatusLabel;
