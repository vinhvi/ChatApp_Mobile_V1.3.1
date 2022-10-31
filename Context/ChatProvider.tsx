// import React, { createContext, useContext, useEffect, useState } from "react";
// import { User } from "../types";
// import { useHistory } from "react-router-dom";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ChatContext = createContext();
// // contextAPI: qly state of our app -> fetch state directly from 1 place
// // truy cập accessAPI mọi nơi
// const ChatProvider = (data: any) => {
//   const [selectedChat, setSelectedChat] = useState();
//   const [user, setUser] = useState();
//   const [notification, setNotification] = useState([]);
//   const [chats, setChats] = useState([]);

//   const history = useHistory();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setUser(userInfo);
//     if (!userInfo) {
//       history.push("/");
//     }
//   }, [history]);

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
