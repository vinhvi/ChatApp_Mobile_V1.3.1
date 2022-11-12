import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  ImagePickerIOS,
} from "react-native";
import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomTextinput/CustomTextInput";
import CustomButton from "../components/CustomButton/CustomButton";
import navigation from "../navigation";
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
  const [image1, setImage1] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      console.log(image1);
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

        // Alert.alert("Thành Công!!", "Đã upload ảnh");
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const onSignUpressed = async (data: any) => {
    if (loading) {
      return;
    }
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const password2 = data.password2;
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
      await axios.post(
        singupRoute,
        { name, email, password, uriImage },
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
    <View style={styles.container}>
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

      <CustomInput
        name="name"
        placeholder="Nhập Name"
        control={control}
        rules={{ required: "Name không được trống" }}
        secureTextEntry={undefined}
      />
      <CustomInput
        name="email"
        placeholder="Nhập Email"
        control={control}
        rules={{ required: "Email không được trống" }}
        secureTextEntry={undefined}
      />
      <CustomInput
        name="password"
        placeholder="Nhập password"
        secureTextEntry
        control={control}
        rules={{
          required: "Password trống",
          minLength: {
            value: 3,
            message: "Password phải có 8 ký tự",
          },
        }}
      />
      <CustomInput
        name="password2"
        placeholder="Nhập lại password"
        secureTextEntry
        control={control}
        rules={{
          required: "Password trống",
          minLength: {
            value: 3,
            message: "Password phải có 8 ký tự",
          },
        }}
      />

      <CustomButton
        text={loading ? "Loading..." : "Đăng ký"}
        onPress={handleSubmit(onSignUpressed)}
        bgColor={undefined}
        fgColor={undefined}
      />
      <CustomButton
        text="Bạn đã có tài khoản ? Đăng nhập ?"
        type="TERTIARY"
        onPress={onSignUpPress}
        bgColor={undefined}
        fgColor={undefined}
      />
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
});
