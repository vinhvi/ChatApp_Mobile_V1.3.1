import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { updateUserInfor } from "../src/API";
import navigation from "../navigation";
import { useNavigation } from "@react-navigation/native";
export default function UpdateProfile() {
  let STORAGE_KEY3 = "@token";
  let STORAGE_KEY1 = "@user";
  const [uriImage, setUriImage] = useState();
  const navigation = useNavigation();
  const [value, setValue] = React.useState("first");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [sex, setSex] = useState();
  const [date, setDate] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const [checked, setChecked] = useState("first");
  const [image1, setImage1] = useState(null);
  const [loading, setLoading] = useState(false);
  const getInfor = async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY1);
      const a = JSON.parse(user);
      setId(a._id);
      setUriImage(a.pic);
      setName(a.name);
      setEmail(a.email);
      setDate(a.birth);
      setPhone(a.phone);
      if (a.sex === 2) {
        setValue("second");
      } else if (a.sex === 3) {
        setValue("three");
      }
    } catch (error) {
      console.log("error in updateInfor ", error);
    }
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
      if (result != null) {
        setUriImage(result.uri);
        setImage1(result);
      }
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
        console.log(data);

        setUriImage(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // console.log("id" + date);

  const updateInfor = async () => {
    try {
      const user_token = await AsyncStorage.getItem(STORAGE_KEY3);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user_token,
        },
      };
      await checkSex();
      if (image1 != null) {
        await uploadphoto(image1);
      }
      const pic = uriImage;
      const birth = date;
      const userId = id;
      // console.log(birth);
      const { data } = await axios.post(
        updateUserInfor,
        { userId, pic, name, sex, birth },
        config
      );
      const new_user = JSON.stringify(data);
      await AsyncStorage.removeItem(STORAGE_KEY1);
      await AsyncStorage.setItem(STORAGE_KEY1, new_user);
      navigation.navigate("LogOut");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getInfor();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.photo}>
        <Image
          source={{
            uri: uriImage,
          }}
          style={styles.image}
        />
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.borderUpload}>
            <Text style={styles.upload}>Sửa ảnh đại diện</Text>
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
      <View style={styles.view_text}>
        <Text style={styles.textinput}>{email}</Text>
      </View>
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
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
          placeholder="Nhập ngày (yyyy-mm-dd)"
          style={styles.textinput}
          value={date}
          onChangeText={(e) => setDate(e)}
        />
      </View>
      <View style={styles.view_text}>
        <Text style={styles.textinput}>{phone}</Text>
      </View>

      <TouchableOpacity onPress={updateInfor}>
        <View style={styles.saveinfor}>
          <Text style={styles.upload}>
            {loading ? "Loading..." : "Lưu thông tin"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    borderWidth: 2,
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
  view_text: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "blue",
    width: 250,
    marginTop: 10,
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
