import { StyleSheet } from "react-native";
import Intro from "./app/screens/Intro";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DiaryScreen from "./app/screens/DiaryScreen";

export default function App() {
  const [username, setUsername] = useState<string>("");
  const findUser = async () => {
    setTimeout(async () => {
      const name = (await AsyncStorage.getItem("user")) as string;
      if (name !== null) {
        setUsername(JSON.parse(name).username ?? "");
      }
    }, 2000);
  };

  useEffect(() => {
    findUser();
  }, [username]);
  if (!username) return <Intro onFinish={findUser} />;
  return <DiaryScreen username={username} />;
}
