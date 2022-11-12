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
  let STORAGE_KEY = "@chatID";
  let STORAGE_KEY2 = "@user";
  let STORAGE_KEY1 = "@userChat";
  const [chatName1, setChatName] = useState("");
  const [time, setTime] = useState("");
  const [avatar, setAvatar] = useState();
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState("");
  const user = chatRoom.users[1];
  const user1 = chatRoom.users[0];
  const [isCheck, setIsCheck] = useState(false);
  const onclick = async () => {
    navigation.navigate("ChatRoom", { name: chatName1, image: avatar });
    try {
      !isCheck
        ? await AsyncStorage.setItem(STORAGE_KEY1, JSON.stringify(user))
        : await AsyncStorage.setItem(STORAGE_KEY1, JSON.stringify(user1));
      await AsyncStorage.setItem(STORAGE_KEY, idChat);
    } catch (error) {
      console.log(error);
    }
  };
  const checkUeser = async () => {
    try {
      const a = await AsyncStorage.getItem(STORAGE_KEY2);
      const b = JSON.parse(a);
      if (b._id === user._id) {
        if (chatRoom.isGroupChat != true) {
          setChatName(user1.name);
          setAvatar(user1.pic);
          setIsCheck(true);
        } else {
          setChatName(chatRoom.chatName.toString());
        }
      } else {
        setName();
      }
    } catch (error) {
      console.log("lỗi get user in chatScreen item: ", error);
    }
  };
  const check = () => {
    if (chatRoom.latestMessage != null) {
      let a = chatRoom.latestMessage.content;
      setLastMessage(a);
      setTime(chatRoom.latestMessage.createdAt);
    } else {
      return;
    }
  };
  const setName = () => {
    if (chatRoom.isGroupChat != true) {
      setChatName(user.name);
      setAvatar(user.pic);
    } else {
      setChatName(chatRoom.chatName.toString());
    }
  };
  useEffect(() => {
    checkUeser();
    check();
  }, [navigation]);

  return (
    <TouchableNativeFeedback onPress={onclick}>
      <View style={style.container}>
        <View style={style.leftContainer}>
          <Image source={{ uri: avatar }} style={style.avatar} />
          <View style={style.midContainer}>
            <Text style={style.username}>{chatName1}</Text>
            <Text numberOfLines={2} style={style.lastMessage}>
              {lastMessage}
            </Text>
          </View>
        </View>
        <Text style={style.time}>{moment(time).format("DD/MM/YYYY")}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};
export default ChatListItem;
