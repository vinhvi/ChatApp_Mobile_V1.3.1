import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListUser from "../components/UserGroup";

export default function CreateGroupChat() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  let STORAGE_KEY = "@user_input";
  const timkiem = async () => {
    try {
      await clearArray();
      const token = await AsyncStorage.getItem(STORAGE_KEY);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(
        `http://172.16.20.11:5000/api/user?search=${search}`,
        config
      );
      setUser(...user, data);
      console.log("Array user saved: ", user);
    } catch (error) {
      console.log("Lỗi get uer bang search ", error);
    }
  };

  const clearArray = () => {
    setUser([]);
    console.log("đã clear: ", user);
  };

  return (
    <View style={styles.container}>
      <View style={styles.a}>
        <View style={styles.textInput1}>
          <TextInput placeholder={"Nhập tên group.."} />
        </View>
        <View style={styles.create}>
          <TouchableOpacity>
            <Text style={{ color: "white" }}>Create group</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.a}>
        <View style={styles.textInput}>
          <TextInput
            placeholder={"Nhập tên ..."}
            onChangeText={(value) => setSearch(value)}
            onChange={timkiem}
          />
        </View>
        <TouchableOpacity onPress={clearArray}>
          <FontAwesome name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={user}
          renderItem={({ item }) => <ListUser user={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textInput: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    width: "80%",
  },
  textInput1: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    width: "60%",
  },
  a: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  create: {
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    width: "30%",
    backgroundColor: "green",
  },
});
