import {
  FlatList,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import ChatMessage from "../components/ChatMessage";
import BG from "./../assets/images/BG.png";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import { host, sendMessage1 } from "../src/API";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { DefaultEventsMap } from "@socket.io/component-emitter";

var socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const ChatRoomScreen = () => {
  const scrollViewRef = useRef();
  const [newMessages, setNewMessages] = useState("");
  const [token1, setToken1] = useState("");
  const [chatID, setChatID] = useState("");
  const [messages, setMessage] = useState([]);
  const navigation = useNavigation();
  let STORAGE_KEY1 = "@user";
  let STORAGE_KEY2 = "@chatID";
  let STORAGE_KEY3 = "@token";
  const getMessage = async (socket: any) => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY1);
      const a = JSON.parse(user);
      socket.emit("setup", a);
      const user_token = await AsyncStorage.getItem(STORAGE_KEY3);
      setToken1(user_token);
      const chatID2 = await AsyncStorage.getItem(STORAGE_KEY2);
      setChatID(chatID2);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user_token,
        },
      };
      const { data } = await axios.get(
        `${host}/api/message/${chatID2}`,
        config
      );
      setMessage(data);
      socket.emit("join chat", chatID2);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    socket = io(host);
    const unsubscribe = navigation.addListener("focus", () => {
      getMessage(socket);
    });
    return unsubscribe;
  }, [navigation || messages]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log("chat id ne: ", chatID);

      if (
        !chatID || // if chat is not selected or doesn't match current chat
        chatID !== newMessageRecieved.chat._id
      ) {
        console.log("dell nhan dc");
        // if (!notification.includes(newMessageRecieved)) {
        //   // set notification
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        // console.log("id cua phong chat: ", chatID);
        // console.log("ChatRoomScreen: ", newMessageRecieved);
        setMessage([...messages, newMessageRecieved]);
      }
    });
  }, [messages]);
  // useEffect(() => {
  //   const socket = io(host);
  //   getMessage(socket);
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !chatID || // if chat is not selected or doesn't match current chat
  //       chatID !== newMessageRecieved.chat._id
  //     ) {
  //       console.log("iffffffff");
  //       // if (!notification.includes(newMessageRecieved)) {
  //       //   // set notification
  //       //   setNotification([newMessageRecieved, ...notification]);
  //       //   setFetchAgain(!fetchAgain);
  //       // }
  //     } else {
  //       console.log("id cua phong chat: ", chatID);
  //       console.log("ChatRoomScreen: ", newMessageRecieved);
  //       setMessage([...messages, newMessageRecieved]);
  //     }
  //   });
  // }, [messages]);

  const onMicroPhone = () => {
    console.warn("on the microphone for you !!");
  };

  const sendMessage = async () => {
    const socket = io(host);
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
      // console.log("data chatROom", data);
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
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage messages={messages} message={item} />
        )}
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
    marginBottom: 10,
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
