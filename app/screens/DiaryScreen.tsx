import {
  Alert,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import DiaryCard from "../components/DiaryCard";
import FloatingActions from "../components/FloatingActions";
import NoteInputModal from "../components/NoteInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatEpochTime } from "../misc";

const DiaryScreen = ({ username }: { username: string }) => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [diaries, setDiaries] = useState<any[]>([]);
  const [filteredDiaries, setFilteredDiaries] = useState<any>([]);

  const onHandleSubmit = async (diary: string) => {
    const time = new Date().getTime();
    const data = { id: Date.now(), diary, time, date: formatEpochTime(time) };
    const updatedDiaries = [data, ...diaries];
    setDiaries(updatedDiaries);
    await AsyncStorage.setItem("diaries", JSON.stringify(updatedDiaries));
  };

  const findDiaries = async () => {
    const results = await AsyncStorage.getItem("diaries");
    if (results !== null) setDiaries(JSON.parse(results));
  };

  const deleteFunc = async (id: number) => {
    const updatedDiaries = diaries.filter((e: { id: number }) => e.id !== id);
    setDiaries(updatedDiaries);
    await AsyncStorage.setItem("diaries", JSON.stringify(updatedDiaries));
  };

  const onHandleDelete = async (id: number) => {
    Alert.alert("Confirm Delete", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Delete", onPress: () => deleteFunc(id) },
    ]);
  };

  const filteredDiariesFunc = () =>
    diaries.filter((item) => item.date.includes(searchText));

  useEffect(() => {
    setFilteredDiaries(filteredDiariesFunc());
  }, [searchText]);

  useEffect(() => {
    findDiaries();
  }, []);

  const onDiaryUpdate = async (content: string, id: number) => {
    const diaryIndex = diaries.findIndex((item) => item.id === id);
    const updatedDiaries = [...diaries];
    updatedDiaries[diaryIndex].diary = content;

    try {
      await AsyncStorage.setItem("diaries", JSON.stringify(updatedDiaries));
      setDiaries(updatedDiaries);
      setCreateModalOpen(false);
    } catch (error) {
      console.error("Error updating diary in AsyncStorage:", error);
    }
  };

  const windowHeight = Dimensions.get("window").height;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View>
          <Text style={styles.myDiaryTitle}>Hey 👋, {username}</Text>
          <Text style={styles.subtitle}>
            Let's write something on your dear diary
          </Text>
        </View>
        <TextInput
          style={styles.searchInput}
          cursorColor={"#000"}
          placeholder="Search by DD/MM/YYYY"
          onChangeText={(text) => setSearchText(text)}
        />
        {searchText.length > 0 ? (
          <FlatList
            data={filteredDiaries}
            overScrollMode="auto"
            keyExtractor={(item) => item.id}
            scrollToOverflowEnabled
            renderItem={({ item }) => {
              return (
                <View style={{ marginTop: 15 }}>
                  <DiaryCard
                    onHandleDelete={onHandleDelete}
                    id={item.id}
                    date={item.date}
                    diary={item.diary}
                    onHandleUpdate={onDiaryUpdate}
                  />
                </View>
              );
            }}
          />
        ) : !diaries.length ? (
          <View
            style={{
              marginTop: 100,
            }}
          >
            <Text style={styles.noDiaryText}>No Diary found!</Text>
          </View>
        ) : (
          <FlatList
            data={diaries}
            keyExtractor={(item) => item.id}
            scrollToOverflowEnabled
            style={{
              height: windowHeight - 170,
            }}
            renderItem={({ item }) => {
              return (
                <View style={{ marginTop: 15 }}>
                  <DiaryCard
                    onHandleDelete={onHandleDelete}
                    id={item.id}
                    date={item.date}
                    diary={item.diary}
                    onHandleUpdate={onDiaryUpdate}
                  />
                </View>
              );
            }}
          />
        )}
      </View>
      <FloatingActions onCreateClick={() => setCreateModalOpen(true)} />
      <NoteInputModal
        visible={createModalOpen}
        onClose={setCreateModalOpen}
        onSubmit={onHandleSubmit}
      />
    </>
  );
};

export default DiaryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#464646",
    paddingHorizontal: 20,
    height: 45,
    fontSize: 16,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 10,
  },
  myDiaryTitle: {
    fontSize: 28,
    fontWeight: "600",
    opacity: 0.9,
    marginTop: 30,
  },
  subtitle: {
    color: colors.DARK,
    opacity: 0.7,
  },
  noDiaryText: {
    fontWeight: "700",
    opacity: 0.3,
    fontSize: 24,
    alignSelf: "center",
  },
});
