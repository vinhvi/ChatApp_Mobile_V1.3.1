// import React, { createContext, useContext, useEffect, useState } from "react";
// // import { useHistory } from "react-router-dom";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { User } from "../types";

// const ChatContext = createContext<User | null>(null);
// // contextAPI: qly state of our app -> fetch state directly from 1 place
// // truy cập accessAPI mọi nơi
// const ChatProvider = (data: any) => {
//   let STORAGE_KEY = "@user";
//   const [userId, setUserId] = useState("");
//   const [userToken, setUserToken] = useState("");
//   const [avatar, setAvatar] = useState("");
//   //   const [chats, setChats] = useState([]);

//   //   const history = useHistory();

//   useEffect(() => {
//     const setItem = async () => {
//       try {
//         const userInfor = await AsyncStorage.getItem(STORAGE_KEY);
//         const a = JSON.parse(userInfor);
//         setUserId(a._id);
//         setUserToken(a.token);
//         setAvatar(a.pic);
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
//         _id: userId,
//         pic: avatar,
//         name: userToken,
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
