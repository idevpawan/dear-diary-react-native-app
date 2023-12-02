import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import colors from "../misc/colors";

const RoundIconButton = ({
  name,
  size,
  color,
  onPress,
}: {
  name: any;
  size?: number;
  color?: string;
  onPress?: () => void;
}) => {
  return (
    <AntDesign
      style={{
        backgroundColor: colors.PRIMARY,
        padding: 20,
        borderRadius: 50,
        fontSize: 26,
        marginTop: 50,
        elevation: 5,
      }}
      name={name}
      size={size || 24}
      color={color || "#fff"}
      onPress={onPress}
    />
  );
};

export default RoundIconButton;
