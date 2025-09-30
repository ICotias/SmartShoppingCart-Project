import React from "react";
import { Svg, Path } from "react-native-svg";

type PasswordProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
};

export function Password({
  width = 24,
  height = 24,
  color = "currentColor",
  style,
  ...rest
}: PasswordProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      style={style}
      {...rest}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </Svg>
  );
}
