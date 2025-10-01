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
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </Svg>
  );
}
