import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import { User } from "../../types";
import style from "./style";

export type ContactListItemProps = {
  user: User;
  onclick: any;
};
const ListUser = (props: ContactListItemProps) => {
  const { user, onclick } = props;
  let STORAGE_KEY1 = "@userIDaddGroup";
  let STORAGE_KEY2 = "@userNameaddGroup";
  let STORAGE_KEY3 = "@ImageUseraddGroup";
  const [selectedUsers, setSelectedUsers] = useState([]);
  const name = user.name;
  const image = user.pic;

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
export default ListUser;
