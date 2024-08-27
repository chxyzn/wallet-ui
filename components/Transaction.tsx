import { Transaction } from "@/types/Transaction";
import { moderateScale } from "@/utils/screen";
import { View, Text, StyleSheet } from "react-native";

export default function TransactionComponent({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text>{transaction.type === 0 ? "-" : "+"} </Text>
      </View>
      <View>
        <Text>{transaction.user}</Text>
        <Text>{transaction.timestamp}</Text>
      </View>
      <Text>
        {(transaction.type === 0 ? "-" : "+") + " \u0024 " + transaction.amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circle: {
    flex: 1,
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
  },
  content: {
    flex: 3,
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
