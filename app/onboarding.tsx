import CardComponent from "@/components/Card";
import { Colors } from "@/constants/Colors";
import { horizontalScale, verticalScale } from "@/utils/screen";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { Card } from "@/types/Card";
import Feather from "@expo/vector-icons/Feather";
//@ts-ignore
import Spline from "../assets/images/spline.png";
import { Link, Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const imgUrl =
  "data:image/png;base64,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";
const fontSize = 58;

export default function Onboarding({ go }: { go: string }) {
  const router = useRouter();

  if (go === "true") {
    console.log("go");
    return <Redirect href="/(tabs)" />;
  }

  useEffect(() => {});

  const card = new Card(
    "1234 5678 9012 3456",
    "1234567890",
    1000,
    "USD",
    "12/25",
    imgUrl,
    "https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg",
    [],
    [],
    Colors.secondary
  );
  const card2 = new Card(
    "1234 5678 9012 3456",
    "1234567890",
    1000,
    "USD",
    "12/25",
    imgUrl,
    "https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg",
    [],
    [],
    "rgba(225, 225, 225, 0.88)"
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ProfitPilot.</Text>
      <View>
        <CardComponent
          card={card}
          enableTouch={false}
          onPressFunction={() => {}}
          cardHeight={verticalScale(220)}
        ></CardComponent>
        <View style={styles.floadtingCard}>
          <CardComponent
            cardHeight={verticalScale(220)}
            enableTouch={false}
            card={card2}
            onPressFunction={() => {}}
          ></CardComponent>
        </View>
        <View style={styles.requestButton}>
          <Feather name="arrow-down-left" size={26} color="black" />
          <Text style={styles.requestText}>Request</Text>
        </View>
      </View>
      <View style={styles.img}>
        <Image
          source={Spline}
          style={{
            height: verticalScale(100),
            width: verticalScale(100),
          }}
          resizeMethod="resize"
          resizeMode="contain"
        ></Image>
      </View>
      <View style={{ alignSelf: "flex-start", marginLeft: "5%" }}>
        <Text
          style={{
            fontFamily: "SfProRegular",
            fontSize: fontSize,
            marginBottom: verticalScale(-54),
          }}
        >
          Your
        </Text>
        <Text
          style={{
            fontFamily: "SfProBold",
            fontSize: fontSize,
            marginBottom: verticalScale(-54),
          }}
        >
          Financial
        </Text>
        <Text style={{ fontFamily: "SfProRegular", fontSize: fontSize }}>
          Navigator
        </Text>
      </View>
      <View>
        <Text style={styles.tagline}>
          Invest in projects that make a difference. Join us in supporting
          impactful initiatives and create a positive change in the world.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={async () => {
          await AsyncStorage.setItem("onboarding", "done");
          router.replace("/(tabs)");
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "SfProMedium",
              fontSize: 24,
              color: Colors.white,
            }}
          >
            Get Started
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "SfProBold",
    fontSize: 32,
    color: Colors.balck,
    paddingTop: verticalScale(8),
    marginBottom: verticalScale(120),
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  img: {
    position: "absolute",
    top: verticalScale(120),
    left: horizontalScale(50),
  },
  text: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  floadtingCard: {
    position: "absolute",
    top: -240,
    left: 0,
    right: -300,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  tagline: {
    marginHorizontal: "5%",
    color: Colors.lightBlack,
    fontFamily: "SfProRegular",
    marginBottom: verticalScale(30),
  },
  getStartedButton: {
    backgroundColor: Colors.balck,
    width: "90%",
    marginHorizontal: "5%",
    paddingVertical: verticalScale(4),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: horizontalScale(15),
  },
  requestButton: {
    backgroundColor: "rgba(225, 225, 225, 0.48)",
    width: horizontalScale(140),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: horizontalScale(15),
    position: "absolute",
    top: verticalScale(200),
    left: horizontalScale(110),
    transform: [{ rotate: "25deg" }],
  },
  requestText: {
    fontFamily: "SfProMedium",
    fontSize: 20,
    color: Colors.balck,
  },
});
