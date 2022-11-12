import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { checkChat } from "../src/API";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const UserInfor = () => {
  let STORAGE_KEY1 = "@userInfor";
  let STORAGE_KEY2 = "@chatID";
  let STORAGE_KEY = "@user";
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [userID, setUserId] = useState();
  const navigation = useNavigation();
  const inforUser = async () => {
    try {
      const a = await AsyncStorage.getItem(STORAGE_KEY1);
      const b = JSON.parse(a);
      setName(b.name);
      setEmail(b.email);
      setAvatar(b.pic);
      setUserId(b._id);
    } catch (error) {
      console.log("lỗi get user trong UserInfor: ", error);
    }
  };
  useEffect(() => {
    inforUser();
  }, []);

  const checkID = async () => {
    navigation.navigate("ChatRoom", { name: name });
    try {
      const a = await AsyncStorage.getItem(STORAGE_KEY);
      const b = JSON.parse(a);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + b.token,
        },
      };
      const { data } = await axios.post(checkChat, { userId: userID }, config);
      //   setIdChat(data);
      console.log("id chat cua no la: ", data);
      await AsyncStorage.setItem(STORAGE_KEY2, data);
    } catch (error) {
      console.log("lỗi checkIDChat trong ContactListItem: ", error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {/* <Image source={} /> */}
      <Image
        source={{ uri: avatar }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          marginRight: 10,
        }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>{name}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>{email}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              marginRight: 100,
              borderWidth: 1,
              alignItems: "center",
              borderRadius: 20,
              width: 100,
            }}
          >
            <Feather name="phone-call" size={40} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={checkID}>
          <View
            style={{
              borderWidth: 1,
              alignItems: "center",
              borderRadius: 20,
              width: 100,
            }}
          >
            <AntDesign name="message1" size={40} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfor;
