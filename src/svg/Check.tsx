import * as React from "react";
import { SVGProps } from "react";

const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m1.16 10.406 5.623 5.623L20.84 1.97"
      stroke={props.color ? props.color : "#fff"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgCheck;
