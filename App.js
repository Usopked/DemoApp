import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SwipeListView } from "react-native-swipe-list-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DATA = [
  { timestamp: Date.now(), text: "Sample Text" },
  { timestamp: Date.now() + 1, text: "Sample Text2" },
];

export default function App() {
  const [text, setText] = React.useState("");
  const [data, setData] = React.useState(DATA);

  const handleDelete = (timestamp) => {
    const res = data.filter((item) => item.timestamp !== timestamp);
    console.log(res);
    setData([...res]);
  };

  const handleAdd = () => {
    const res = { timestamp: Date.now(), text: text };
    setData([...data, res]);
  };

  const renderItem = ({ item, index }) => {
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
        <View style={{ width: hp(4), height: hp(4), backgroundColor: "#8D71FE", borderRadius: 4, marginHorizontal: wp(5), opacity: 0.4 }} />
        <Text style={{ width: wp(60) }}>{item.text}</Text>
        <View style={{ width: hp(2), height: hp(2), backgroundColor: "#8D71FE", borderRadius: 100, marginHorizontal: wp(3) }} />
      </View>
    );
  };
  const renderHiddenItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(5), paddingVertical: hp(2.5) }}>
        <Pressable onPress={null}>
          <Text style={{ fontSize: hp(3) }}>✍🏻</Text>
        </Pressable>
        <Pressable onPress={()=>handleDelete(item.timestamp)}>
          <Text style={{ fontSize: hp(3) }}>🗑</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView bounces={false}>
        <View style={{ width: wp(100), height: hp(20), justifyContent: "center", paddingLeft: wp(10) }}>
          <Text style={{ fontSize: hp(3), fontWeight: "bold" }}>✔️To do list</Text>
        </View>
        <View style={{ width: wp(100), height: hp(70) }}>
          <SwipeListView data={data} renderItem={renderItem} leftOpenValue={wp(10)} rightOpenValue={-wp(10)} renderHiddenItem={renderHiddenItem} />
        </View>
        <View style={{ width: wp(100), height: hp(10), flexDirection: "row" }}>
          <TextInput
            placeholder="please write the text."
            value={text}
            onChangeText={(item) => setText(item)}
            placeholderTextColor="#aaa"
            style={{ width: wp(60), marginLeft: wp(10), backgroundColor: "#FFF", height: hp(5), paddingLeft: wp(3), borderRadius: 10 }}
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
      </KeyboardAwareScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
});