import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import React, { Component, useState } from "react";

export default function UpdateProfile() {
  const [uriImage, setUriImage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.photo}>
        <Image
          source={{
            uri: uriImage,
          }}
          style={styles.image}
        />
        <TouchableOpacity>
          <View style={styles.borderUpload}>
            <Text style={styles.upload}>Sửa ảnh đại diện</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.view_textinput}>
        <TextInput placeholder="Nhập tên " style={styles.textinput} />
      </View>
      <View style={styles.view_textinput}>
        <TextInput placeholder="Nhập email " style={styles.textinput} />
      </View>
      <View></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  photo: {
    alignItems: "center",
    marginTop: 10,
  },
  borderUpload: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    backgroundColor: "gray",
  },
  upload: {
    fontWeight: "bold",
    color: "white",
  },
  view_textinput: {
    borderRadius: 10,
    borderWidth: 1,
    width: 250,
    marginTop: 10,
  },
  textinput: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    height: 30,
  },
});
