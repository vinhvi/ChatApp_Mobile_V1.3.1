import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type ContactListItemProps = {
  user: User;
  onclick: any;
};
const ListUseradd = (props: ContactListItemProps) => {
  const { user, onclick } = props;
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.pic }} style={styles.avatar} />
      <Text>{user.name}</Text>
      <TouchableOpacity onPress={onclick}>
        <MaterialCommunityIcons name="delete-forever" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "gray",
    marginLeft: 10,
    borderRadius: 10,
    width: 150,
    height: 50,
    alignItems: "center",
  },
  avatar: {
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
});
export default ListUseradd;
