import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const InforUserChat = () => {
  let STORAGE_KEY = "@userChat";
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [isCheck, setIsCheck] = useState(true);
  const getInforUserChat = async () => {
    try {
      const a = await AsyncStorage.getItem(STORAGE_KEY);
      const userInfor = JSON.parse(a);
      setName(userInfor.name);
      setAvatar(userInfor.pic);
      //   console.log("infor user Chat: ", userInfor);
    } catch (error) {
      console.log("Error in get infor user chat: ", error);
    }
  };
  useEffect(() => {
    getInforUserChat();
  }, [name]);
  return (
    <View style={{}}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: avatar }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginTop: 10,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
          {name}
        </Text>
      </View>
      <TouchableOpacity>
        <View style={{}}>
          {!isCheck ? (
            <View style={{ alignItems: "center" }}>
              <AntDesign name="adduser" size={24} color="black" />
              <Text> Kết bạn</Text>
            </View>
          ) : (
            <View>
              <MaterialCommunityIcons
                name="account-remove"
                size={24}
                color="black"
              />
              <Text> Hủy kết bạn</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default InforUserChat;
