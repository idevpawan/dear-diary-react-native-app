import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import RoundIconButton from "./RoundIconButton";

const FloatingActions = ({ onCreateClick }: { onCreateClick: () => void }) => {
  return (
    <View style={styles.container}>
      <RoundIconButton onPress={onCreateClick} name={"plus"} />
    </View>
  );
};

export default FloatingActions;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    right: 10,
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
});
