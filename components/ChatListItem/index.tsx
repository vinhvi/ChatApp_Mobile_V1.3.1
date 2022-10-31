import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import { ChatRoom } from "../../types";
import style from "./style";

export type ChatRoomProps = {
  chatRoom: ChatRoom;
};
const ChatListItem = (props: ChatRoomProps) => {
  const { chatRoom } = props;
  const idChat = chatRoom._id;
  const [arrayId, setarrId] = useState([]);
  let STORAGE_KEY = "@chatID";
  const [chatName1, setChatName] = useState("");
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState("");
  const user = chatRoom.users[1];
  const onclick = async () => {
    navigation.navigate("ChatRoom", { name: chatName1 });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, idChat);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("data chatRoom", idChat);
  const check = () => {
    if (chatRoom.latestMessage != null) {
      let a = chatRoom.latestMessage.content;
      setLastMessage(a);
    } else {
      return;
    }
  };

  // console.log(arrayId);
  useEffect(() => {
    const setName = () => {
      if (chatRoom.isGroupChat != true) {
        setChatName(user.name);
      } else {
        setChatName(chatRoom.chatName.toString());
      }
    };
    setName();
    check();
  }, []);

  return (
    <TouchableNativeFeedback onPress={onclick}>
      <View style={style.container}>
        <View style={style.leftContainer}>
          <Image source={{ uri: user.pic }} style={style.avatar} />
          <View style={style.midContainer}>
            <Text style={style.username}>{chatName1}</Text>
            <Text numberOfLines={2} style={style.lastMessage}>
              {lastMessage}
            </Text>
          </View>
        </View>
        {/* <Text style={style.time}>
          {moment(chatRoom.latestMessage.createdAt).format("DD/MM/YYYY")}
        </Text> */}
      </View>
    </TouchableNativeFeedback>
  );
};
export default ChatListItem;
