import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  ImagePickerIOS,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import React, { Component, useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { singupRoute } from "../src/API";
import * as ImagePicker from "expo-image-picker";

export default function SignUpScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [uriImage, setUriImage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [sex, setSex] = useState();
  const [date, setDate] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [checked, setChecked] = useState("first");
  const [image1, setImage1] = useState(null);

  const onSignUpPress = () => {
    navigation.navigate("Login");
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // let image = {
      //   uri: result.uri,
      //   type: `test/${result.uri.split(".")[1]}`,
      //   name: `test.${result.uri.split(".")[1]}`,
      // };
      setUriImage(result.uri);
      setImage1(result);
    } else {
      alert("ko load dc anh ");
    }
  };
  const uploadphoto = (result: any) => {
    let image = {
      uri: result.uri,
      type: `test/${result.uri.split(".")[1]}`,
      name: `test.${result.uri.split(".")[1]}`,
    };
    if (loading) {
      return;
    }
    setLoading(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "MongoChat04");
    data.append("cloud_name", "dfgkg5eej");
    fetch("https://api.cloudinary.com/v1_1/dfgkg5eej/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("image uri", data);
        //  pic = data.url.toString();
        setUriImage(data.url);
        console.log("uri image: " + uriImage);

        // Alert.alert("Thành Công!!", "Đã upload ảnh");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const checkSex = () => {
    if (checked === "second") {
      setSex(2);
    } else if (checked === "three") {
      setSex(3);
    } else {
      setSex(1);
    }
  };
  const onSignUpressed = async () => {
    if (loading) {
      return;
    }
    if (password != password2) {
      Alert.alert("Lỗi password nhập lại không khớp ");
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await checkSex();
      const birth = date;
      const pic = uriImage;
      await axios.post(
        singupRoute,
        { name, email, phone, password, pic, birth, sex },
        config
      );
      await uploadphoto(image1);
      Alert.alert("Đăng ký thành công!!");
      navigation.navigate("Login");
    } catch (errors) {
      console.log(errors);
    }
    setLoading(false);
  };

  return (
    <ScrollView>
      <View style={styles.container1}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 35, marginTop: 5 }}>
            Đăng Ký
          </Text>
        </View>
        <View style={styles.photo}>
          <Image
            source={{
              uri: uriImage,
            }}
            style={styles.image}
          />
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.borderUpload}>
              <Text style={styles.upload}>Chọn ảnh đại diện</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.view_textinput}>
          <TextInput
            placeholder="Nhập tên "
            style={styles.textinput}
            value={name}
            disableFullscreenUI
            onChangeText={(e) => setName(e)}
          />
        </View>
        <View style={styles.view_textinput}>
          <TextInput
            placeholder="Nhập email "
            style={styles.textinput}
            value={email}
            disableFullscreenUI
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        <View style={styles.view_textinput}>
          <TextInput
            placeholder="Nhập số điện thoại "
            style={styles.textinput}
            value={phone}
            disableFullscreenUI
            onChangeText={(e) => setPhone(e)}
          />
        </View>
        <RadioButton.Group
          onValueChange={(newValue) => setChecked(newValue)}
          value={checked}
        >
          <View style={styles.view1_radio}>
            <View style={styles.view2_radio}>
              <Text style={{ marginTop: 7 }}>Nam</Text>
              <RadioButton value="first" />
              <View style={styles.view2_radio}>
                <Text style={{ marginTop: 7, marginLeft: 20 }}>Nữ</Text>
                <RadioButton value="second" />
              </View>
              <View style={styles.view2_radio}>
                <Text style={{ marginTop: 7 }}>Khác</Text>
                <RadioButton value="three" />
              </View>
            </View>
          </View>
        </RadioButton.Group>
        <View style={styles.view_textinput}>
          <TextInput
            placeholder="Nhập ngày sinh ( yyyy-
          mm-dd) "
            style={styles.textinput}
            value={date}
            disableFullscreenUI
            onChangeText={(e) => setDate(e)}
          />
        </View>
        <View style={styles.view_textinput}>
          <TextInput
            placeholder="Nhập mật khẩu "
            style={styles.textinput}
            value={password}
            disableFullscreenUI
            onChangeText={(e) => setPassword(e)}
          />
        </View>
        <View style={styles.view_textinput}>
          <TextInput
            placeholder="Nhập lại mật khẩu "
            style={styles.textinput}
            value={password2}
            disableFullscreenUI
            onChangeText={(e) => setPassword2(e)}
          />
        </View>
        <TouchableOpacity onPress={onSignUpressed}>
          <View style={styles.saveinfor}>
            <Text style={styles.upload1}>
              {loading ? "Loading..." : "Đăng ký"}
            </Text>
          </View>
        </TouchableOpacity>
        <CustomButton
          text="Bạn đã có tài khoản ? Đăng nhập ?"
          type="TERTIARY"
          onPress={onSignUpPress}
          bgColor={undefined}
          fgColor={undefined}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  container1: {
    alignItems: "center",
    flex: 1,
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
  upload1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  view_textinput: {
    borderRadius: 10,
    borderWidth: 1,
    width: 300,
    marginTop: 5,
  },
  textinput: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    height: 30,
  },
  view1_radio: {
    flexDirection: "row",
  },
  view2_radio: {
    marginTop: 5,
    flexDirection: "row",
    marginLeft: 20,
  },
  saveinfor: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    backgroundColor: "red",
  },
});
