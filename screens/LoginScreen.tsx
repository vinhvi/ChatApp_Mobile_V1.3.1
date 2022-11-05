import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useForm, Controller } from "react-hook-form";
import React, { Component, useEffect, useState } from "react";
import CustomInput from "../components/CustomTextinput/CustomTextInput";
import CustomButton from "../components/CustomButton/CustomButton";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import { loginRoute } from "../src/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  let STORAGE_KEY = "@user_input";
  let STORAGE_KEY2 = "@user_id";
  let STORAGE_KEY3 = "@user";

  const onSignInPressed = async (data: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const email = data.email;
      const password = data.password;
      const config = {
        crossDomain: true,
        headers: {
          "Content-type": "application/json",
        },
      };
      const a = await axios.post(loginRoute, { email, password }, config);
      console.log(a.data.token);
      const user = JSON.stringify(a.data);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, a.data.token);
        await AsyncStorage.setItem(STORAGE_KEY3, user);
        await AsyncStorage.setItem("keepLogin", JSON.stringify(true));
        // console.log("user: ", user);

        await AsyncStorage.setItem(STORAGE_KEY2, a.data._id);
      } catch (err) {
        console.log(err);
      }
      navigation.navigate("Root1");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.root}>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/images/logo_chatap.png")}
        />
      </View>
      <CustomInput
        name="email"
        placeholder="Nhập Email"
        control={control}
        rules={{ required: "Email không được trống" }}
        secureTextEntry={undefined}
      />
      <CustomInput
        name="password"
        placeholder="Password"
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
        text={loading ? "Loading..." : "Sign In"}
        onPress={handleSubmit(onSignInPressed)}
        bgColor={undefined}
        fgColor={undefined}
      />
      <CustomButton
        text="Bạn chưa có tài khoản ? Đăng ký tài khoản ?"
        type="TERTIARY"
        onPress={onSignUpPress}
        bgColor={undefined}
        fgColor={undefined}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    marginTop: 50,
    width: 300,
    height: 200,
  },
});
