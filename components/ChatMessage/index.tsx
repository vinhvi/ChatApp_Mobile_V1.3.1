import React, { useEffect, useState } from "react";
import { Message } from "../../types";
import { Text, View } from "react-native";
import moment from "moment";
import style from "../ChatMessage/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ChatMessageProps = {
  message: Message;
};

const ChatMessage = (props: ChatMessageProps) => {
  let STORAGE_KEY2 = "@user_id";
  const { message } = props;
  // console.log(message.sender._id);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const xyz = async () => {
      try {
        const id = await AsyncStorage.getItem(STORAGE_KEY2);
        setUserID(id);
      } catch (e) {
        console.log(e);
      }
    };
    xyz();
  }, []);
  // console.log(userID);
  const isMyMessage = () => {
    return message.sender._id === userID;
  };
  return (
    <View style={style.container}>
      <View
        style={[
          style.messageBox,
          {
            backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
            marginRight: isMyMessage() ? 0 : 50,
            marginLeft: isMyMessage() ? 50 : 0,
          },
        ]}
      >
        {!isMyMessage() && (
          <Text style={style.name}>{message.sender.name}</Text>
        )}
        <Text style={style.message}>{message.content}</Text>
        <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};
export default ChatMessage;
