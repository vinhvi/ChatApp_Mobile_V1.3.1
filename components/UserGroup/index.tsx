import React from "react";
import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import { User } from "../../types";
import style from "./style";

export type ContactListItemProps = {
  user: User;
};
const ListUser = (props: ContactListItemProps) => {
  const { user } = props;
  const click = () => {
    console.log("mày đã bấm vào thằng: ", user._id);
  };
  return (
    <TouchableNativeFeedback onPress={click}>
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
