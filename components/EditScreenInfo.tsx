// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { Component, useEffect } from "react";
// import { View, Text } from "react-native";
// import { getChatRom } from "../src/API";
// import { ChatRoom } from "../types";

// export default class Test extends Component {
//   state = {
//     chatRoom: [],
//   };

//   async componentDidMount() {
//     // axios.get(`https://jsonplaceholder.typicode.com/posts`).then((response) => {
//     //   const posts = response.data;
//     //   this.setState({ posts });
//     // });
//     let STORAGE_KEY = "@user_input";
//     try {
//       const token = await AsyncStorage.getItem(STORAGE_KEY);
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//       };
//       const { data } = await axios.get(getChatRom, config);
//       const chatRoom = data;
//       this.setState({ chatRoom });
//     } catch (e) {
//       console.log(e);
//     }

//     this.state.chatRoom.map((chatRoom) => {
//       chatRoom._id;
//     });
//   }

//   render() {
//     return (
//       <View>
//         <Text>{}</Text>
//       </View>
//     );
//   }
// }
