import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../misc/colors";

const NoteInputModal = ({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: (val: boolean) => void;
  onSubmit: (val: string) => void;
}) => {
  const [diary, setDiary] = useState<string>("");
  const onHandleChangeInput = (text: string) => setDiary(text);
  const currentDate =
    new Date().getDate() +
    "/" +
    new Date().getMonth() +
    "/" +
    new Date().getFullYear();

  const handleSubmit = () => {
    if (!diary.trim()) return onClose(false);
    onSubmit(diary);
    setDiary("");
    onClose(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: colors.DARK,
              opacity: 0.7,
            }}
          >
            {currentDate}
          </Text>
          <TouchableOpacity onPress={() => onClose(false)} style={{}}>
            <Text
              style={{
                fontSize: 18,
                opacity: 0.7,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
          }}
        >
          <TextInput
            placeholder="Write here..."
            multiline={true}
            spellCheck={false}
            cursorColor={"#000"}
            onChangeText={(text) => onHandleChangeInput(text)}
            value={diary}
            style={{
              borderRadius: 20,
              backgroundColor: "#DBF3DB",
              padding: 20,
              fontSize: 16,
              marginVertical: 20,
              width: "100%",
              overflow: "scroll",
              maxHeight: 300,
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 50,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: colors.PRIMARY,
              padding: 15,
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: 18,
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({});
