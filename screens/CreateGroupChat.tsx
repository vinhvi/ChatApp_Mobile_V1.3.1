import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListUser from "../components/UserGroup";
import ListUseradd from "../components/UserGroup/index2";
import { useNavigation } from "@react-navigation/native";
import { host } from "../src/API";

export default function CreateGroupChat() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  let STORAGE_KEY = "@user";
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigation = useNavigation();
  let STORAGE_KEY1 = "@chatID";
  const timkiem = async () => {
    try {
      const a = await AsyncStorage.getItem(STORAGE_KEY);
      const b = JSON.parse(a);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + b.token,
        },
      };
      const { data } = await axios.get(
        `${host}/api/user?search=${search}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      console.log("Lỗi get uer bang search ", error);
    }
  };

  const handleGroup = (userToAdd: any) => {
    if (selectedUsers.includes(userToAdd)) {
      Alert.alert(userToAdd.name + " đã được thêm vào phòng");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser: never) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      Alert.alert("Tên group trống hoặc chưa có người nào trong group!!");
      return;
    }
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEY);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        `${host}/api/chat/groupMobile`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      navigation.navigate("ChatRoom", { name: groupChatName });
      await AsyncStorage.setItem(STORAGE_KEY1, data).catch((e) =>
        console.log("Lỗi khi lưu chatID trong ContactListItem", e)
      );
    } catch (error) {
      console.log(" ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.a}>
        <View style={styles.textInput1}>
          <TextInput
            placeholder={"Nhập tên group.."}
            onChangeText={(e) => {
              setGroupChatName(e);
            }}
          />
        </View>
        <View style={styles.create}>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={{ color: "white" }}>Create group</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.a}>
        <View style={styles.textInput}>
          <TextInput
            placeholder={"Nhập tên ..."}
            value={search}
            onChangeText={(value) => setSearch(value)}
            onChange={timkiem}
          />
        </View>
        <TouchableOpacity onPress={timkiem}>
          <FontAwesome name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.arrayUser}>
        {selectedUsers.map((u) => (
          <ListUseradd key={u._id} user={u} onclick={() => handleDelete(u)} />
        ))}
      </View>
      <View>
        {searchResult?.slice(0, 4).map((user) => (
          <ListUser
            user={user}
            key={user._id}
            onclick={() => handleGroup(user)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  arrayUser: {
    marginTop: 10,
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
