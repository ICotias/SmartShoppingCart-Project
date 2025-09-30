import React from "react";
import { Svg, Rect, Path } from "react-native-svg";

export type AppLogoProps = {
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  style?: any;
};

export function AppLogo({
  width = 43,
  height = 40,
  color = "white",
  backgroundColor = "#2C46B1",
  style,
  ...rest
}: AppLogoProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 43 40"
      fill="none"
      style={style}
      {...rest}
    >
      <Rect width="43" height="40" rx="9" fill={backgroundColor} />
      <Path
        d="M10 9H12.6667L13.2 11.6667M13.2 11.6667H34L28.6667 22.3333H15.3333M13.2 11.6667L15.3333 22.3333M15.3333 22.3333L12.276 25.3907C11.436 26.2307 12.0307 27.6667 13.2187 27.6667H28.6667M28.6667 27.6667C27.9594 27.6667 27.2811 27.9476 26.781 28.4477C26.281 28.9478 26 29.6261 26 30.3333C26 31.0406 26.281 31.7189 26.781 32.219C27.2811 32.719 27.9594 33 28.6667 33C29.3739 33 30.0522 32.719 30.5523 32.219C31.0524 31.7189 31.3333 31.0406 31.3333 30.3333C31.3333 29.6261 31.0524 28.9478 30.5523 28.4477C30.0522 27.9476 29.3739 27.6667 28.6667 27.6667ZM18 30.3333C18 31.0406 17.719 31.7189 17.219 32.219C16.7189 32.719 16.0406 33 15.3333 33C14.6261 33 13.9478 32.719 13.4477 32.219C12.9476 31.7189 12.6667 31.0406 12.6667 30.3333C12.6667 29.6261 12.9476 28.9478 13.4477 28.4477C13.9478 27.9476 14.6261 27.6667 15.3333 27.6667C16.0406 27.6667 16.7189 27.9476 17.219 28.4477C17.719 28.9478 18 29.6261 18 30.3333Z"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
