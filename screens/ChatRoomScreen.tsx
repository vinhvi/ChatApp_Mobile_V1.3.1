import {
  FlatList,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";
import BG from "../assets/images/BG.png";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import io from "socket.io-client";
import { host, sendMessage1 } from "../src/API";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../constants/Colors";

const ChatRoomScreen = () => {
  const socket = io(host);
  const [newMessages, setNewMessages] = useState("");
  // const [socketConnected, setSocketConnected] = useState(false);
  const [token1, setToken1] = useState("");
  const [chatID, setChatID] = useState("");
  const [messages, setMessage] = useState([]);
  let STORAGE_KEY = "@user_input";
  let STORAGE_KEY2 = "@chatID";

  const getMessage = async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEY);
      setToken1(token);
      const chatID2 = await AsyncStorage.getItem(STORAGE_KEY2);
      setChatID(chatID2);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(
        `http://172.16.20.11:5000/api/message/${chatID2}`,
        config
      );
      setMessage(data);
      socket.emit("join chat", chatID2);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setMessage([...messages, newMessageRecieved]);
    });
  }, []);

  const onMicroPhone = () => {
    console.warn("on the microphone for you !!");
  };

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ` + token1,
        },
      };
      const { data } = await axios.post(
        sendMessage1,
        {
          content: newMessages,
          chatId: chatID,
        },
        config
      );
      console.log("data chatROom", data);
      socket.emit("new message", data);
      setMessage([...messages, data]);
      setNewMessages("");
    } catch (e) {
      console.log(e);
    }
  };

  const onPress = () => {
    if (!newMessages) {
      onMicroPhone();
    } else {
      sendMessage();
    }
  };

  return (
    <ImageBackground source={BG} style={{ width: "100%", height: "100%" }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
      />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <FontAwesome5 name="laugh" size={24} color="black" />
          <TextInput
            placeholder="type a message"
            style={styles.textInput}
            multiline
            value={newMessages}
            onChangeText={setNewMessages}
          />
          <Entypo
            name="attachment"
            size={24}
            color="black"
            style={styles.icon}
          />
          {!newMessages && (
            <AntDesign
              name="camera"
              size={24}
              color="black"
              style={styles.icon}
            />
          )}
        </View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>
            {!newMessages ? (
              <MaterialCommunityIcons
                name="microphone"
                size={24}
                color="white"
              />
            ) : (
              <MaterialIcons name="send" size={24} color="white" />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 50,
    flex: 1,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    marginTop: 10,
    marginRight: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ChatRoomScreen;
