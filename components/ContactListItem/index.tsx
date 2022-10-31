import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import { checkChat } from "../../src/API";
import { User } from "../../types";
import style from "./style";

export type ContactListItemProps = {
  user: User;
};
const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  const userID = user._id;
  const chatName1 = user.name;
  let STORAGE_KEY = "@user_input";
  let STORAGE_KEY1 = "@chatID";
  const navigation = useNavigation();
  const [idChat, setIdChat] = useState("");
  const onclick = async () => {
    navigation.navigate("ChatRoom", { name: chatName1 });
    checkID();
  };
  const checkID = async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEY);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(checkChat, { userId: userID }, config);
      setIdChat(data);
      // console.log("id chat cua no la: ", data);
      await AsyncStorage.setItem(STORAGE_KEY1, idChat).catch((e) =>
        console.log("Lỗi khi lưu chatID trong ContactListItem", e)
      );
    } catch (error) {
      console.log("lỗi checkIDChat trong ContactListItem: ", error);
    }
  };

  return (
    <TouchableNativeFeedback onPress={onclick}>
      <View style={style.container}>
        <View style={style.leftContainer}>
          <Image source={{ uri: user.pic }} style={style.avatar} />
          <View style={style.midContainer}>
            <Text style={style.username}>{user.name}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
export default ContactListItem;
