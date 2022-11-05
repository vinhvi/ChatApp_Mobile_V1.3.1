// import React, { createContext, useContext, useEffect, useState } from "react";
// // import { useHistory } from "react-router-dom";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ChatContext = createContext<String | null>(null);
// // contextAPI: qly state of our app -> fetch state directly from 1 place
// // truy cập accessAPI mọi nơi
// const ChatProvider = (data: any) => {
//   let STORAGE_KEY = "@user";
//   const [selectedChat, setSelectedChat] = useState();
//   const [user, setUser] = useState();
//   const [notification, setNotification] = useState([]);
//   const [chats, setChats] = useState([]);

//   //   const history = useHistory();

//   useEffect(() => {
//     const setItem = async () => {
//       try {
//         const userInfor = await AsyncStorage.getItem(STORAGE_KEY);
//         return userInfor != null ? JSON.parse(userInfor) : null;
//       } catch (error) {
//         console.log("Lỗi get user!! ", error);
//       }
//     };
//     setItem();
//     // if (!userInfo) {
//     //   history.push("/");
//     // }
//   }, []);

//   return (
//     <ChatContext.Provider
//       value={{
//         user,
//         setUser,
//         selectedChat,
//         setSelectedChat,
//         notification,
//         setNotification,
//         chats,
//         setChats,
//       }}
//     >
//       {data}
//     </ChatContext.Provider>
//   );
// };

// export const ChatState = () => {
//   return useContext(ChatContext);
// };

// export default ChatProvider;
