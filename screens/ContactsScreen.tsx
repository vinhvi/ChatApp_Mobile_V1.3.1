import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { View } from "../components/Themed";
import { getAllUserRoute } from "../src/API";
// import { ChatState } from "../Context/ChatProvider";
export default function ContactsScreen() {
  // const { user } = ChatState();
  const [users, setUsers] = useState([]);
  let STORAGE_KEY = "@user";
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const a = await AsyncStorage.getItem(STORAGE_KEY);
        const b = JSON.parse(a);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + b.token,
          },
        };
        const usersData = await axios.get(getAllUserRoute, config);
        setUsers(usersData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} key={item.id} />}
        // keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
