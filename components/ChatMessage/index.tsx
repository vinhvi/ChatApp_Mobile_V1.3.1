import React, { useEffect, useState } from "react";
import { Message } from "../../types";
import { Text, View, Image } from "react-native";
import moment from "moment";
import style from "../ChatMessage/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ChatMessageProps = {
  message: Message;
  messages: Message[];
};

const ChatMessage = (props: ChatMessageProps) => {
  let STORAGE_KEY2 = "@user";
  let STORAGE_KEY1 = "@userChat";
  const { message, messages } = props;
  // console.log(message.sender._id);
  const [userID, setUserID] = useState("");
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const xyz = async () => {
      try {
        const a = await AsyncStorage.getItem(STORAGE_KEY2);
        const b = JSON.parse(a);
        setUserID(b._id);
        const c = await AsyncStorage.getItem(STORAGE_KEY1);
        const d = JSON.parse(c);
        setAvatar(d.pic);
      } catch (e) {
        console.log(e);
      }
    };
    xyz();
  }, [avatar]);
  // console.log(userID);
  const isMyMessage = () => {
    return message.sender._id === userID;
  };
  // const isSameSenderMargin = (
  //   messages: string | any[],
  //   m: { sender: { _id: any } },
  //   i: number,
  //   userId: any
  // ) => {
  //   // console.log(i === messages.length - 1);

  //   if (
  //     i < messages.length - 1 &&
  //     messages[i + 1].sender._id === m.sender._id &&
  //     messages[i].sender._id !== userId
  //   )
  //     return "auto auto auto 38px";
  //   else if (
  //     (i < messages.length - 1 &&
  //       messages[i + 1].sender._id !== m.sender._id &&
  //       messages[i].sender._id !== userId) ||
  //     (i === messages.length - 1 && messages[i].sender._id !== userId)
  //   )
  //     return "auto auto auto 0px";
  //   else return "auto 10px auto auto";
  // };
  // const sizeText = () => {
  //   return message.content.length === 18;
  // };
  return (
    <View style={style.container}>
      <View
        style={[
          // { flexDirection: "row" },
          { alignItems: isMyMessage() ? "flex-end" : "flex-start" },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          {!isMyMessage() && (
            <Image
              source={{ uri: avatar }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 40,
                marginRight: 10,
              }}
            />
          )}
          <View
            style={[
              style.messageBox,
              {
                backgroundColor: isMyMessage() ? "#DCF8C5" : "white",

                marginLeft: isMyMessage() ? 50 : 0,
                marginRight: isMyMessage() ? 0 : 50,
              },
            ]}
          >
            <Text style={style.message}>{message.content}</Text>
            {/* <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};
export default ChatMessage;
