import { horizontalScale, moderateScale, verticalScale } from "@/utils/screen";
import { View, StyleSheet, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { Card } from "@/types/Card";
//@ts-ignore

export default function FilppedCard({ card }: { card: Card }) {
  return (
    <View style={styles.flippedCard}>
      <Feather name="wifi" size={24} color={Colors.balck} />
      <Text style={styles.creditCardNumber} numberOfLines={1}>
        {card.number}
      </Text>

      <View style={styles.whiteView}>
        <View style={styles.cardInfo}>
          <Text style={styles.regularText}>Valid Thru</Text>
          <Text style={styles.boldText}>
            <Text style={styles.exp}>Exp </Text>
            {card.validity}
          </Text>
        </View>
      </View>
      <Image
        source={{ uri: card.cardType }}
        height={verticalScale(45)}
        width={horizontalScale(60)}
        style={{
          position: "absolute",
          bottom: "16%",
          right: horizontalScale(16),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flippedCard: {
    height: verticalScale(220),
    width: verticalScale(320),
    borderRadius: verticalScale(30),
    backgroundColor: "#c8e9ca",
    display: "flex",
    paddingTop: verticalScale(26),
    paddingLeft: horizontalScale(26),
    paddingRight: horizontalScale(16),
    marginBottom: verticalScale(16),
  },
  whiteView: {
    backgroundColor: Colors.white,
    height: verticalScale(100),
    width: verticalScale(320),
    borderRadius: verticalScale(30),
    borderTopLeftRadius: 0,
    borderTopEndRadius: 0,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  creditCardNumber: {
    fontFamily: "SfProBold",
    fontSize: 24,
    color: Colors.balck,
  },
  cardInfo: {
    top: verticalScale(40),
    left: horizontalScale(16),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  regularText: {
    fontFamily: "SfProBold",
    fontSize: 14,
    color: Colors.balck,
  },
  boldText: {
    fontFamily: "SfProBold",
    fontSize: 14,
    color: Colors.balck,
    marginTop: verticalScale(-6),
  },
  exp: {
    fontFamily: "SfProMedium",
    fontSize: 14,
    color: Colors.grey,
  },
});
