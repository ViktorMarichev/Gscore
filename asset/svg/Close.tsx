import * as React from "react";
import { SVGProps } from "react";

const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 19 19 1M19 19 1 1"
      stroke={props.color ? props.color : "#fff"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgClose;
