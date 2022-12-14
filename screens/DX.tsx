import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

const Logout = () => {
  let STORAGE_KEY1 = "@user";
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const navigation = useNavigation();
  const [phone, setPhone] = useState();
  const getItem = async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY1);
      const user1 = JSON.parse(user);
      setAvatar(user1.pic);
      setName(user1.name);
      setEmail(user1.email);
      setPhone(user1.phone);
    } catch (error) {
      console.log("Lỗi khi get thông tin user tại DX ", error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getItem();
    });

    return unsubscribe;
  }, [navigation]);

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY1);
      await AsyncStorage.removeItem("@chatID");
      await AsyncStorage.removeItem("@userInfor");
      navigation.navigate("Login1");
    } catch (error) {
      console.log("Lỗi Đăng xuất ", error);
    }
  };
  const updateProfile = () => {
    navigation.navigate("UpdateProfile");
  };

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
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: "#0E6655",
          marginTop: 10,
          width: 150,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={updateProfile}
          // style={{ backgroundColor: "#0E6655", borderColor: "#0E6655" }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Sửa thông tin
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10, marginBottom: 10, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#0E6655" }}>
          {email}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#0E6655" }}>
          {phone}
        </Text>
      </View>

      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: "red",
          width: 200,
          height: 35,
          alignItems: "center",
          marginTop: 300,
        }}
      >
        <TouchableOpacity onPress={logoutUser}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Đăng Xuất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;
