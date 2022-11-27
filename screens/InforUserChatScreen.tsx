import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const InforUserChat = () => {
  let STORAGE_KEY = "@userChat";
  let STORAGE_KEY3 = "@nameGroup";
  let STORAGE_KEY2 = "@countUser";
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [isGroup, setIsGroup] = useState(false);
  const [countUser, setCountUser] = useState(null);
  const [isCheck, setIsCheck] = useState(true);
  const getInforUserChat = async () => {
    try {
      const z = await AsyncStorage.getItem(STORAGE_KEY3);
      console.log(z);

      if (z != null) {
        setName(z);
        const count = await AsyncStorage.getItem(STORAGE_KEY2);
        setCountUser(count);
        setIsGroup(true);
      } else {
        const a = await AsyncStorage.getItem(STORAGE_KEY);
        const userInfor = JSON.parse(a);
        setName(userInfor.name);
        setAvatar(userInfor.pic);
      }

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
        {!isGroup ? (
          <Image
            source={{ uri: avatar }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginTop: 10,
            }}
          />
        ) : (
          <Image
            source={require("../assets/images/icon_group.jpg")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginTop: 10,
            }}
          />
        )}

        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
          {name}
        </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity>
          {!isGroup ? (
            <View style={{}}>
              {!isCheck ? (
                <View style={{ alignItems: "center" }}>
                  <AntDesign name="adduser" size={35} color="black" />
                  <Text style={styles.text}> Kết bạn</Text>
                </View>
              ) : (
                <View>
                  <MaterialCommunityIcons
                    name="account-remove"
                    size={36}
                    color="black"
                  />
                  <Text style={styles.text}> Hủy kết bạn</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Entypo name="log-out" size={35} color="black" />
              <Text style={styles.text}>Rời Nhóm</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.viewcall}>
            <Ionicons name="call-outline" size={35} color="white" />
          </View>
          <Text style={styles.text}>Gọi thoại</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.viewcall}>
            <MaterialCommunityIcons name="video" size={35} color="white" />
          </View>
          <Text style={styles.text}>Gọi video</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.conatinerbtt}>
        <TouchableOpacity>
          <View style={styles.viwebtt}>
            <Text style={styles.textbtt1}>file, link, ảnh</Text>
          </View>
        </TouchableOpacity>
        {!isGroup ? (
          <TouchableOpacity>
            <View style={styles.viwebt1}>
              <Text style={styles.textbtt}>Xóa tin nhắn</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.viwebtt}>
            <Text style={styles.textbtt1}>
              {countUser} thành viên trong nhóm
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewcall: {
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: "#0E6655",
    alignItems: "center",
    width: 60,
  },
  text: {
    margin: 5,
    fontWeight: "bold",
  },
  viwebtt: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    width: 260,
    marginTop: 20,
  },
  viwebt1: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    width: 260,
    backgroundColor: "red",
    marginTop: 20,
  },
  textbtt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  textbtt1: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  conatinerbtt: {
    alignItems: "center",
    marginTop: 100,
  },
});

export default InforUserChat;
