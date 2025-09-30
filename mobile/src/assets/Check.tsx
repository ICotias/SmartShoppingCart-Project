import React from "react";
import { Svg, Rect, Path } from "react-native-svg";

interface CheckProps {
  size?: number;
  color?: string;
}

export const Check: React.FC<CheckProps> = ({
  size = 24,
  color = "currentColor",
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke={color}
    width={size}
    height={size}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </Svg>
);
