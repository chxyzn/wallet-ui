import { Transaction } from "@/types/Transaction";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTransactionData = async (transaction: Transaction) => {
  try {
    const value = JSON.stringify(transaction);
    var previousValue = (await AsyncStorage.getItem("transactions")) ?? "";
    var newValue = previousValue + ";;" + value;
    if (previousValue === "") {
      newValue = value;
    }
    await AsyncStorage.setItem("transactions", newValue);
  } catch (e) {
    return;
  }
};

export const getTrasactionData = async (): Promise<Transaction[]> => {
  try {
    const value = await AsyncStorage.getItem("transactions");
    if (value !== null) {
      return value.split(";;").map((transaction) => JSON.parse(transaction));
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};
