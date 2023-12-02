import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../misc/colors";
import RoundIconButton from "../components/RoundIconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ onFinish }: { onFinish: () => void }) => {
  const [username, setUsername] = useState<string>("");

  const handleOnChangeText = (name: string) => setUsername(name);
  const handleOnPress = async () => {
    const user = { username: username };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.textTitle}>Enter Your Name to Continue</Text>
        <TextInput
          cursorColor={colors.DARK}
          value={username}
          onChangeText={handleOnChangeText}
          style={styles.textInput}
          placeholder="Enter name"
          autoFocus
          showSoftInputOnFocus
        />
        {username && username?.length > 0 && (
          <RoundIconButton onPress={handleOnPress} name={"arrowright"} />
        )}
      </View>
    </>
  );
};

export default Intro;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
    alignSelf: "flex-start",
    paddingLeft: 25,
    color: colors.DARK,
    opacity: 0.6,
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    width: width - 50,
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: colors.PRIMARY,
  },
});
