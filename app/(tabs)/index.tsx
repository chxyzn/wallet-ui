import AppBar from "@/components/AppBar";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dataConfig from "../../data.config.json";
import CardComponent from "@/components/Card";
import { horizontalScale } from "@/utils/screen";
import { Colors } from "@/constants/Colors";
import { Transaction } from "@/types/Transaction";
import TransactionComponent from "@/components/Transaction";

export default function HomeScreen() {
  const [user, setUser] = useState<User>(new User("", "", []));
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const user: User = User.fromJSON(dataConfig.user);
    const transactions: Transaction[] = dataConfig.transactions.map(
      (transaction: any) => Transaction.fromJSON(transaction)
    );

    setUser(user);
    setTransactions(transactions);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppBar user={user}></AppBar>
        <Text>Account</Text>
        <FlatList
          horizontal
          data={user.cards}
          renderItem={({ item }) => <CardComponent card={item} />}
          style={styles.cardList}
        ></FlatList>
        {/* Button Row */}
        <View style={styles.buttonRow}>
          <Text>Request</Text>
          <Text>Transfer</Text>
          <View>
            <Text>+</Text>
          </View>
        </View>
        <View style={styles.transactionRow}>
          <Text>Transactions</Text>
          <Text>View all</Text>
        </View>
      </View>

      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionComponent transaction={item} />}
        style={styles.transactionList}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(16),
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardList: {},
  transactionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionList: {
    marginBottom: horizontalScale(16),
  },
});
