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
  let STORAGE_KEY1 = "@userInfor";
  const navigation = useNavigation();
  const [idChat, setIdChat] = useState();
  const onclick = async () => {
    navigation.navigate("UserInfor");
    // checkID();
    infor();
  };
  const infor = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY1, JSON.stringify(user));
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
