import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined;
  Login1: undefined;
  SignUp: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Root1: NavigatorScreenParams<RootTabParamList> | undefined;
  ChatRoom: undefined;
  Contact: undefined;
  CreateGroupChat: undefined;
  LogOut: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
export type User = {
  _id: String;
  name: string;
  pic: string;
};

export type Message = {
  id: String;
  sender: User;
  content: string;
  chat: ChatRoom;
  recallMessage: Number;
  createdAt: string;
};
export type ChatRoom = {
  _id: String;
  chatName: String;
  isGroupChat: Boolean;
  users: User[];
  latestMessage: Message;
};
