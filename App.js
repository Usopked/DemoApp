import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SwipeListView } from "react-native-swipe-list-view";

const DATA = [
  {
    timestamp: Date.now(),
    text: "Sample Text",
    isEditing: false,
    isStriked: false,
  },
  {
    timestamp: Date.now() + 1,
    text: "Sample Text2",
    isEditing: false,
    isStriked: false,
  },
];

export default function App() {
  const [text, setText] = React.useState("");
  const [data, setData] = React.useState(DATA);

  const handleDelete = (timestamp) => {
    const updatedData = data.filter((item) => item.timestamp !== timestamp);
    setData(updatedData);
  };

  const handleAdd = () => {
    if (text.trim()) {
      const newItem = {
        timestamp: Date.now(),
        text,
        isEditing: false,
        isStriked: false,
      };
      setData((prevData) => [...prevData, newItem]);
      setText(""); // 추가 후 입력창 비우기
      Keyboard.dismiss(); // 입력 완료 후 키보드 숨기기
    }
  };

  const handleEdit = (timestamp) => {
    const updatedData = data.map((item) =>
      item.timestamp === timestamp ? { ...item, isEditing: true } : item
    );
    setData(updatedData);
  };

  const handleSaveEdit = (timestamp, newText) => {
    const updatedData = data.map((item) =>
      item.timestamp === timestamp ? { ...item, text: newText } : item
    );
    setData(updatedData);
  };

  const handleEndEditing = (timestamp) => {
    const updatedData = data.map((item) =>
      item.timestamp === timestamp ? { ...item, isEditing: false } : item
    );
    setData(updatedData);
  };

  const handleStrikeThrough = (timestamp) => {
    const updatedData = data.map((item) =>
      item.timestamp === timestamp ? { ...item, isStriked: !item.isStriked } : item
    );
    setData(updatedData);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: wp(90),
          height: wp(90) / 4,
          backgroundColor: "#FFF",
          marginHorizontal: wp(5),
          borderRadius: 10,
          marginBottom: hp(2),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: hp(4),
            height: hp(4),
            backgroundColor: "#8D71FE",
            borderRadius: 4,
            marginHorizontal: wp(5),
            opacity: 0.4,
          }}
        />
        {item.isEditing ? (
          <TextInput
            style={{
              width: wp(60),
              textDecorationLine: item.isStriked ? "line-through" : "none",
            }}
            value={item.text}
            onChangeText={(newText) => handleSaveEdit(item.timestamp, newText)}
            autoFocus
            onEndEditing={() => handleEndEditing(item.timestamp)}
          />
        ) : (
          <Text
            style={{
              width: wp(60),
              textDecorationLine: item.isStriked ? "line-through" : "none",
            }}
          >
            {item.text}
          </Text>
        )}
        <View
          style={{
            width: hp(2),
            height: hp(2),
            backgroundColor: "#8D71FE",
            borderRadius: 100,
            marginHorizontal: wp(3),
          }}
        />
      </View>
    );
  };

  const renderHiddenItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: wp(5),
          paddingVertical: hp(2.5),
        }}
      >
        <Pressable onPress={() => handleEdit(item.timestamp)}>
          <Text style={{ fontSize: hp(3) }}>✍🏻</Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(item.timestamp)}>
          <Text style={{ fontSize: hp(3) }}>🗑</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? hp(10) : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: wp(100),
              height: hp(20),
              justifyContent: "center",
              paddingLeft: wp(10),
            }}
          >
            <Text style={{ fontSize: hp(3), fontWeight: "bold" }}>
              ✔️ To do list
            </Text>
          </View>
          <View style={{ width: wp(100), height: hp(60) }}>
            <SwipeListView
              data={data}
              renderItem={renderItem}
              leftOpenValue={wp(15)}
              rightOpenValue={-wp(15)}
              renderHiddenItem={renderHiddenItem}
              disableRightSwipe={false}
              keyExtractor={(item) => item.timestamp.toString()} // timestamp를 키로 사용
              onRowOpen={(rowKey, rowMap, toValue) => {
                if (toValue < 0) {
                  handleStrikeThrough(Number(rowKey)); // rowKey를 timestamp로 간주
                }
              }}
              onRowDidOpen={(rowKey, rowMap, toValue) => {
                if (toValue > 0) {
                  handleEdit(Number(rowKey)); // rowKey를 timestamp로 간주
                }
              }}
            />
          </View>
          <View
            style={{
              width: wp(100),
              height: hp(12),
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: hp(4),
              marginTop: hp(4),
            }}
          >
            <TextInput
              placeholder="이곳에 글을 적어주세요."
              value={text}
              onChangeText={setText}
              placeholderTextColor="#aaa"
              style={{
                width: wp(60),
                marginLeft: wp(10),
                backgroundColor: "#FFF",
                height: hp(5),
                paddingLeft: wp(3),
                borderRadius: 10,
              }}
            />
            <Pressable
              style={{
                width: hp(5),
                height: hp(5),
                marginLeft: wp(10),
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
              }}
              onPress={handleAdd}
            >
              <Text>➕</Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
});