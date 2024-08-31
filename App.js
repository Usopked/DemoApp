import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CITY = ["Seoul", "Tokyo", "Beijing", "Shanghai"];
const APIKEY = "06467cd3dc1fdc733e509c4d7ef6e5a0";

export default function App() {
  const [isReady, setReady] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [region, setRegion] = React.useState("Seoul");

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${APIKEY}`);
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (err) {
        console.log(err);
      }
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [region]);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={{
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: item === region ? "#BBACF2" : "#BEC0D1",
          marginHorizontal: wp(3),
          width: wp(20),
          height: hp(5),
        }}
        onPress={() => setRegion(item)}
      >
        <Text style={{ color: "#fff" }}>{item}</Text>
      </Pressable>
    );
  };
  const renderItem2 = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          marginTop: hp(2),
          marginHorizontal: wp(4),
          width: wp(30),
          height: wp(30),
        }}
      >
        <Text style={{ color: "#BBACF2", fontSize: hp(2), marginBottom: 10, fontWeight: "bold" }}>{item.key}</Text>
        <Text style={{ color: "#ccc", fontSize: hp(2) }}>{item.value}</Text>
      </View>
    );
  };

  if (isReady) {
    return (
      <View style={styles.container2}>
        <View>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={CITY} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>
        <View style={{ marginTop: hp(5), alignSelf: "center", width: wp(70), height: hp(40), backgroundColor: "#fff", borderRadius: 20 }}>
          <Image
            style={{ width: wp(60), height: wp(60), alignSelf: "center" }}
            source={{
              uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={{ textAlign: "center", fontSize: hp(5), fontWeight: "bold" }}>{data.weather[0].main}</Text>
          <Text style={{ textAlign: "center", fontSize: hp(4), color: "#bbb" }}>{data.weather[0].description}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <FlatList
            numColumns={2}
            data={[
              { key: "Min Temp", value: data.main.temp_min },
              { key: "Max Temp", value: data.main.temp_max },
              { key: "Pressure", value: data.main.pressure },
              { key: "Humidity", value: data.main.humidity },
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem2}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image style={{ marginTop: hp(20), width: wp(70), height: wp(70), alignSelf: "center" }} source={require("./assets/icon.png")} />
      <Text style={{ marginTop: hp(5), width: wp(70), textAlign: "center", alignSelf: "center", fontSize: hp(3) }}>
        <Text style={{ color: "#BBACF2", fontWeight: "bold" }}>Find</Text> your weather predictions in your City
      </Text>
      <Text style={{ marginTop: hp(2), width: wp(70), textAlign: "center", alignSelf: "center", fontSize: hp(2), color: "#bbb" }}>
        Easy steps to predict the weather and make your day easier
      </Text>
      <Pressable
        style={{
          width: wp(50),
          height: hp(6),
          marginTop: hp(15),
          backgroundColor: "#BBACF2",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
        onPress={() => setReady(true)}
      >
        <Text style={{ fontSize: hp(2), color: "#fff", fontWeight: "bold" }}>Get start</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAE6F5",
  },
  container2: {
    flex: 1,
    backgroundColor: "#EAE6F5",
    paddingTop: hp(10),
  },
});