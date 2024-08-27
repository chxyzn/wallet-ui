import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "../types/User";
// @ts-ignore
import { BellSvg } from "../assets/svg/bell.svg";
import { SvgXml } from "react-native-svg";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/screen";

export default function AppBar({ user }: { user: User }) {
  console.log(BellSvg);
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.imgUrl }} style={styles.image}></Image>
      <View>
        <Text>Welcome Back!</Text>
        <Text>{user.name}</Text>
      </View>
      {/* <SvgXml
        xml={BellSvg}
        height={verticalScale(24)}
        width={horizontalScale(24)}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: verticalScale(50),
    width: horizontalScale(50),
    borderRadius: moderateScale(25),
    marginRight: horizontalScale(10),
  },
});
