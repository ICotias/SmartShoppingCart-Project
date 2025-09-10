import { View } from "react-native";

type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "logo";

type SpacingProps = {
  size?: SpacingSize;
};

const spacingValues: Record<SpacingSize, number> = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  logo: 42,
};

export function Spacing({ size = "md" }: SpacingProps) {
  return <View style={{ height: spacingValues[size] }} />;
}
