import styled from "styled-components";

const StatusLabel = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 22px;
  color: ${({ status }: { status: string }) => {
    switch (status) {
      case "ACTIVE":
        return "#05c168";
      case "INACTIVE":
        return "#FF5A65;";
      case "HOLD":
        return "#FF9E2C";
      default:
        return "#05c168";
    }
  }};
`;
export default StatusLabel;
