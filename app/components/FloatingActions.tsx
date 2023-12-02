import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import RoundIconButton from "./RoundIconButton";

const FloatingActions = ({ onCreateClick }: { onCreateClick: () => void }) => {
  return (
    <LinearGradient colors={["transparent", "#fff"]} style={styles.container}>
      <View>
        <RoundIconButton onPress={onCreateClick} name={"plus"} />
      </View>
    </LinearGradient>
  );
};

export default FloatingActions;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
});
