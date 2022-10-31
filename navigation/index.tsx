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
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, TouchableNativeFeedback, View } from "react-native";
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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SingUpScreen}
        options={{ title: "Đăng Nhập" }}
      />
      <Stack.Screen
        name="CreateGroupChat"
        component={CreateGroupChat}
        options={{ title: "Create Group Chat New!!" }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={({ navigation }) => ({
          title: "ChatApp",
          headerRight: () => (
            <View
              style={{
                backgroundColor: "#0C6157",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 60,
                marginRight: 10,
              }}
            >
              <Octicons name="search" size={24} color={"white"} />
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.navigate("CreateGroupChat");
                }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color={"white"}
                />
              </TouchableNativeFeedback>
            </View>
          ),
        })}
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
              <FontAwesome name="video-camera" size={24} color={"white"} />
              <MaterialIcons name="call" size={24} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color={"white"}
              />
            </View>
          ),
        })}
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
