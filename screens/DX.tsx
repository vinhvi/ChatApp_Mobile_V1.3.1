import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

const Logout = () => {
  const navigation = useNavigation();
  const logoutUser = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login1");
    } catch (error) {
      console.log("Lỗi Đăng xuất ", error);
    }
  };
  let STORAGE_KEY1 = "@user";
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    const getItem = async () => {
      try {
        const user = await AsyncStorage.getItem(STORAGE_KEY1);
        const user1 = JSON.parse(user);
        setAvatar(user1.pic);
        setName(user1.name);
      } catch (error) {
        console.log("Lỗi khi get thông tin user tại DX ", error);
      }
    };
    getItem();
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <View style={{}}>
        <Image
          source={{ uri: avatar }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginRight: 10,
          }}
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
      </View>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: "red",
          width: 100,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={logoutUser}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;
