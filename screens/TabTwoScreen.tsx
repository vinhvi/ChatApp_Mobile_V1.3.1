import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";

export default function TabTwoScreen() {
  const image =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            marginRight: 10,
            marginTop: 5,
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>Ahri 2964</Text>
          <Text style={{ color: "red" }}>Cuộc gọi nhỡ</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            marginRight: 10,
            marginTop: 5,
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>Ahri 2964</Text>
          <Text style={{ color: "red" }}>Cuộc gọi nhỡ</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            marginRight: 10,
            marginTop: 5,
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>Ahri 2964</Text>
          <Text style={{ color: "red" }}>Cuộc gọi nhỡ</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            marginRight: 10,
            marginTop: 5,
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>Ahri 2964</Text>
          <Text style={{ color: "red" }}>Cuộc gọi nhỡ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    // borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
