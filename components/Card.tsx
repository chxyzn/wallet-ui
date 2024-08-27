import { Colors } from "@/constants/Colors";
import { Card } from "@/types/Card";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/screen";
import { StyleSheet, Text, View } from "react-native";

export default function CardComponent({ card }: { card: Card }) {
  return (
    <View style={styles.container}>
      {/* currency row */}
      <View style={styles.currencyRow}>
        <Text>{card.currency}</Text>
        <Text>{card.cardType}</Text>
      </View>

      <Text>Your Balance</Text>
      <Text>{card.balance}</Text>

      <View style={styles.cardInfoRow}>
        <View style={styles.cardInfo}>
          <Text>Valid Thru</Text>
          <Text>{card.validity}</Text>
        </View>

        <View style={styles.cardInfo}>
          <Text>Account Number</Text>
          <Text> {card.number}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(250),
    height: verticalScale(250),
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(12),
    marginRight: moderateScale(30),
    paddingLeft: moderateScale(12),
    paddingRight: moderateScale(12),
    paddingTop: verticalScale(12),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  currencyRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfoRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
});
