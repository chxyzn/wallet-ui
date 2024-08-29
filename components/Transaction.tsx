import { Colors } from "@/constants/Colors";
import { Transaction } from "@/types/Transaction";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/screen";
import { View, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { collectManifestSchemes } from "expo-linking";

export default function TransactionComponent({
  transaction,
}: {
  transaction: Transaction;
}) {
  function formatTimestampTo12Hour(timeString: string): string {
    const date = new Date(timeString);

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutesFormatted} ${ampm}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {transaction.type === 0 ? (
          <Feather name="arrow-up-right" size={26} color="black" />
        ) : (
          <Feather name="arrow-down-left" size={26} color="black" />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.mediumText} numberOfLines={1}>
          {transaction.user}
        </Text>
        <Text style={styles.mediumTextGrey}>
          {formatTimestampTo12Hour(transaction.timestamp)}
        </Text>
      </View>
      <View style={styles.end}>
        <Text style={styles.mediumText}>
          {transaction.type !== 0 ? (
            <Text style={{ color: "green" }}>+</Text>
          ) : (
            <Text style={{ color: "red" }}>-</Text>
          )}
          {" \u0024 " + transaction.amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: horizontalScale(20),

    paddingRight: horizontalScale(20),
    marginBottom: verticalScale(6),
  },
  circle: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(25),
    backgroundColor: Colors.lightGrey,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignSelf: "flex-start",
    width: horizontalScale(220),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  end: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  mediumText: {
    fontFamily: "SfProMedium",
    fontSize: 16,
    color: Colors.balck,
  },
  mediumTextGrey: {
    fontFamily: "SfProMedium",
    fontSize: 14,
    color: Colors.grey,
  },
});
