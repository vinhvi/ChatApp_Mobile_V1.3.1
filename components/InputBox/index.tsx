import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { io } from "socket.io-client";
import { host, sendMessage1 } from "../../src/API";
import style from "../InputBox/style";

const InputBox = () => {
  const socket = io(host);
  let STORAGE_KEY2 = "@chatID";
  let STORAGE_KEY = "@user_input";
  const [chatID, setChatId] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const xyz = async () => {
      try {
        const id = await AsyncStorage.getItem(STORAGE_KEY2);
        const token = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(token);
        setChatId(id);
      } catch (e) {
        console.log(e);
      }
    };
    xyz();
  });
  const onMicroPhone = () => {
    console.warn("on the microphone for you !!");
  };
  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ` + token,
        },
      };
      const { data } = await axios.post(
        sendMessage1,
        {
          content: message,
          chatId: chatID,
        },
        config
      );
      console.log(data);
      socket.emit("new message", data);
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };
  const onPress = () => {
    if (!message) {
      onMicroPhone();
    } else {
      sendMessage();
    }
  };

  return (
    <View style={style.container}>
      <View style={style.mainContainer}>
        <FontAwesome5 name="laugh" size={24} color="black" />
        <TextInput
          placeholder="type a message"
          style={style.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Entypo name="attachment" size={24} color="black" style={style.icon} />
        {!message && (
          <AntDesign name="camera" size={24} color="black" style={style.icon} />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={style.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={24} color="white" />
          ) : (
            <MaterialIcons name="send" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default InputBox;
