import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ColorSchemeName,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import LoginScreen from "../screens/LoginScreen";
import SingUpScreen from "../screens/SignUpScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateGroupChat from "../screens/CreateGroupChat";
import { useEffect, useState } from "react";
import { Text } from "../components/Themed";
import Logout from "../screens/DX";
import UserInfor from "../screens/UserInfor";
import InforUserChat from "../screens/InforUserChatScreen";
import updateProfile from "../screens/UpdateProfileScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const navigation = useNavigation();
  const dangXuat = () => {
    navigation.navigate("LogOut");
  };
  const inforUserChat = () => {
    navigation.navigate("InforUserChat");
  };
  let STORAGE_KEY1 = "@user";
  const [login, setLogin] = useState(false);
  const [avatar, setAvatar] = useState();
  const isFocused = useIsFocused();
  const keepLogin = async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY1);
      const user1 = JSON.parse(user);
      // console.log("user in system: " + user);

      if (user === null) {
        setLogin(false);
      } else {
        await setAvatar(user1.pic);
        setLogin(true);
      }
    } catch (error) {
      console.log("Lỗi loading in index(navigation)", error);
    }
  };
  useEffect(() => {
    keepLogin();
  }, [isFocused]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {!login ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "" }}
        />
      ) : (
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => (
              <View
                style={{
                  backgroundColor: "#0C6157",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginRight: 10,
                }}
              >
                <TouchableNativeFeedback onPress={dangXuat}>
                  <Image
                    source={{ uri: avatar }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      marginRight: 10,
                    }}
                  />
                </TouchableNativeFeedback>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  MESSAGE
                </Text>
                <View style={{ marginRight: 40 }}>
                  <TouchableNativeFeedback
                    onPress={() => {
                      navigation.navigate("CreateGroupChat");
                    }}
                  >
                    <AntDesign name="plus" size={30} color="white" />
                  </TouchableNativeFeedback>
                </View>
              </View>
            ),
          })}
        />
      )}
      <Stack.Screen
        name="Login1"
        component={LoginScreen}
        options={() => ({
          title: "",
          headerLeft: () => <View></View>,
        })}
      />

      <Stack.Screen
        name="Root1"
        component={BottomTabNavigator}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => (
            <View
              style={{
                backgroundColor: "#0C6157",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginRight: 10,
              }}
            >
              <TouchableNativeFeedback onPress={dangXuat}>
                <Image
                  source={{ uri: avatar }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginRight: 10,
                  }}
                />
              </TouchableNativeFeedback>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                MESSAGE
              </Text>
              <View style={{ marginRight: 40 }}>
                <TouchableNativeFeedback
                  onPress={() => {
                    navigation.navigate("CreateGroupChat");
                  }}
                >
                  <AntDesign name="plus" size={30} color="white" />
                </TouchableNativeFeedback>
              </View>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SingUpScreen}
        options={{ title: "Đăng Nhập" }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={updateProfile}
        options={{ title: "Sửa Thông Tin" }}
      />
      <Stack.Screen
        name="UserInfor"
        component={UserInfor}
        options={{ title: "Thông tin người dùng" }}
      />
      <Stack.Screen
        name="CreateGroupChat"
        component={CreateGroupChat}
        options={{ title: "Create Group Chat New!!" }}
      />

      <Stack.Screen
        name="LogOut"
        component={Logout}
        options={{ title: "Thông tin tài khoản" }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <View
              style={{
                backgroundColor: "#0C6157",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 100,
                marginRight: 10,
              }}
            >
              {/* <TouchableOpacity onPress={inforUserChat}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  {route.params.name}
                </Text>
              </TouchableOpacity> */}
              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginLeft: 120,
                }}
              > */}
              <FontAwesome
                name="video-camera"
                size={24}
                color={"white"}
                // style={{ marginLeft: 30 }}
              />
              <MaterialIcons
                name="call"
                size={24}
                color={"white"}
                // style={{ marginLeft: 40 }}
              />
              <TouchableOpacity onPress={inforUserChat}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color={"white"}
                  // style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
              {/* </View> */}
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="InforUserChat"
        component={InforUserChat}
        options={{ title: "Tùy Chọn" }}
      />
    </Stack.Navigator>
  );
}
//  onPress={navigation.navigate("CreateGroupChat")}
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createMaterialTopTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle: {
          backgroundColor: "#0C6157",
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 4,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <BottomTab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          title: "Chats",
          tabBarIcon: ({}) => <Entypo name="chat" size={24} color="white" />,
        }}
      />
      <BottomTab.Screen
        name="Status"
        component={ContactsScreen}
        options={{
          title: "Danh bạ",
          tabBarIcon: ({}) => (
            <AntDesign name="contacts" size={24} color="white" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Calls"
        component={TabTwoScreen}
        options={{
          title: "Cuộc gọi",
          tabBarIcon: ({}) => (
            <FontAwesome name="video-camera" size={24} color="white" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
