import React from "react";
import { Svg, Path } from "react-native-svg";

export type AddIconProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
};

export function AddIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  style,
  ...rest
}: AddIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
      {...rest}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}
