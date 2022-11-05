import { BackHandler, FlatList, StyleSheet } from "react-native";
import ChatListItem from "../components/ChatListItem";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { getChatRom, host } from "../src/API";
import React from "react";
import { useNavigation } from "@react-navigation/native";
export default function ChatScreen() {
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = useState();

  let STORAGE_KEY = "@user_input";
  let STORAGE_KEY1 = "@user";
  let STORAGE_KEY2 = "@user_id";
  let STORAGE_KEY3 = "@NameTap";
  useEffect(() => {
    const abcd = async () => {
      try {
        const id = AsyncStorage.getItem(STORAGE_KEY2);
        const token = await AsyncStorage.getItem(STORAGE_KEY);
        // const user = await AsyncStorage.getItem(STORAGE_KEY3);
        // console.log("user in chatScreen: ", user);
        // // socket.emit("setup", user);
        // const chatID2 = await AsyncStorage.getItem(STORAGE_KEY2);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const { data } = await axios.get(getChatRom, config);
        // console.log("Chatscreen", data);
        setChatRooms(data);
        // console.log("user data:  ", data);
        // socket.emit("join chat", chatID2);
      } catch (e) {
        console.log(e);
      }
    };
    abcd();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chatRooms}
        renderItem={({ item }) => (
          <ChatListItem chatRoom={item} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
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
