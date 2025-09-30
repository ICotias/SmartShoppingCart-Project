import React from "react";
import { Svg, Path } from "react-native-svg";

type UserProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
};

export function User({
  width = 24,
  height = 24,
  color = "currentColor",
  style,
  ...rest
}: UserProps) {
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
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </Svg>
  );
}
