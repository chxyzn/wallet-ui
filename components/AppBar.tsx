import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "../types/User";
// @ts-ignore
import { horizontalScale, moderateScale, verticalScale } from "@/utils/screen";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";

export default function AppBar({ user }: { user: User }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: user.imgUrl }} style={styles.image}></Image>
        <View style={styles.textView}>
          <Text style={styles.greetingText}>Welcome Back!</Text>
          <Text style={styles.nameText}>{user.name}</Text>
        </View>
      </View>
      <Feather name="bell" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    display: "flex",
  },
  greetingText: {
    fontFamily: "SfProRegular",
    fontSize: 16,
    alignSelf: "flex-end",
    paddingBottom: 0,
    color: Colors.grey,
  },
  nameText: {
    fontFamily: "SfProRegular",
    fontSize: 16,
    color: "black",
    marginTop: verticalScale(-12),
  },
  image: {
    height: verticalScale(50),
    width: horizontalScale(50),
    borderRadius: moderateScale(25),
    borderColor: "grey",
    borderWidth: 1,
    marginRight: horizontalScale(10),
  },
});
