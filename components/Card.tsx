import { Colors } from "@/constants/Colors";
import { Card } from "@/types/Card";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/screen";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

export default function CardComponent({
  card,
  onPressFunction,
  cardHeight,
  cardWidth,
  enableTouch = true,
}: {
  card: Card;
  onPressFunction: (card: Card) => void;
  cardHeight?: number;
  cardWidth?: number;
  enableTouch?: boolean;
}) {
  const [showBalance, setShowBalance] = useState<boolean>(false);

  const maskAccountNumber = (accountNumber: string): string => {
    const visibleDigits = 5;
    const maskedSection = "*".repeat(accountNumber.length - visibleDigits);
    const visibleSection = accountNumber.slice(-visibleDigits);
    return `${maskedSection}${visibleSection}`;
  };
  return (
    <TouchableOpacity
      activeOpacity={enableTouch ? 0.6 : 1}
      onPress={(_) => onPressFunction(card)}
    >
      <View
        style={{
          ...styles.container,
          height: cardHeight ?? verticalScale(240),
          width: cardWidth ?? horizontalScale(270),
          marginRight: cardWidth === undefined ? horizontalScale(20) : 0,
          backgroundColor: card.color,
        }}
      >
        {/* currency row */}
        <View style={styles.currencyRow}>
          <View style={styles.currencyContainer}>
            <Image
              source={{ uri: card.currencyFlagImgUrl }}
              height={verticalScale(25)}
              width={horizontalScale(25)}
              borderRadius={moderateScale(12)}
            />
            <Text style={styles.currencyText} numberOfLines={1}>
              {card.currency}
            </Text>
          </View>
          <Image
            source={{ uri: card.cardType }}
            height={verticalScale(25)}
            width={horizontalScale(40)}
          />
        </View>

        <View>
          <Text style={styles.whiteText}>Your Balance</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>
              {showBalance ? "\u0024 " + card.balance : "***"}
            </Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <View style={styles.eyeContainer}>
                {showBalance ? (
                  <AntDesign
                    name="eyeo"
                    size={moderateScale(24)}
                    color="white"
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={moderateScale(24)}
                    color="white"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardInfoRow}>
          <View style={styles.cardInfo}>
            <Text style={styles.whiteText}>Valid Thru</Text>
            <Text style={styles.regularText}>{card.validity}</Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.whiteText}>Account Number</Text>
            <Text style={styles.regularText}>
              {" "}
              {maskAccountNumber(card.accountNumber)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(270),
    height: verticalScale(250),
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(30),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
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
  currencyContainer: {
    maxWidth: horizontalScale(120),
    height: verticalScale(40),
    backgroundColor: Colors.white,
    borderRadius: horizontalScale(50),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: horizontalScale(8),
    paddingRight: horizontalScale(8),
  },
  currencyText: {
    fontFamily: "SfProMedium",
    fontSize: 16,
    color: Colors.balck,
    overflow: "hidden",
    paddingLeft: horizontalScale(8),
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

  balanceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyeContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: "rgba(255,255,255,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  whiteText: {
    fontFamily: "SfProRegular",
    fontSize: 12,
    color: Colors.white,
  },

  balanceText: {
    fontFamily: "SfProMedium",
    fontSize: 36,
    color: Colors.balck,
  },
  regularText: {
    fontFamily: "SfProMedium",
    fontSize: 16,
    color: Colors.balck,
    textAlign: "left",
    alignSelf: "flex-start",
  },
});
