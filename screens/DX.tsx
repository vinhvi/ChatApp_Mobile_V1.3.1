import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";

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

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <View
        style={{ borderRadius: 20, borderWidth: 1, backgroundColor: "red" }}
      >
        <TouchableOpacity onPress={logoutUser}>
          <Text style={{ color: "white" }}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;
