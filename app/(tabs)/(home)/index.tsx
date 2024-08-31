import AppBar from "@/components/AppBar";
import { User } from "@/types/User";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dataConfig from "../../../data.config.json";
import CardComponent from "@/components/Card";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/screen";
import { Colors } from "@/constants/Colors";
import { Transaction } from "@/types/Transaction";
import TransactionComponent from "@/components/Transaction";
import { useRouter } from "expo-router";
import { Card } from "@/types/Card";
import Feather from "@expo/vector-icons/Feather";
import safe_area_android from "@/constants/safe_area_android";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import FormComponent from "@/components/BottomSheet";
import { getTrasactionData } from "@/utils/storeage";

export default function HomeScreen() {
  const [user, setUser] = useState<User>(
    new User(
      "",
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      []
    )
  );

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshTransactions, setRefreshTransactions] = useState(false);
  const [isViewAllEnabled, setIsViewAllEnabled] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const transactionBottomSheetRef = useRef<BottomSheet>(null);

  const router = useRouter();

  useEffect(() => {
    const user: User = User.fromJSON(dataConfig.user);
    const transactions: Transaction[] = dataConfig.transactions.map(
      (transaction: any) => Transaction.fromJSON(transaction)
    );

    setUser(user);
    getTrasactionData().then((transactions) => {
      transactions.forEach((transaction) => {
        setTransactions((prev) => [transaction, ...prev]);
      });
    });
    setTransactions(transactions);
  }, []);

  function handleCardPress(card: Card) {
    router.push({
      pathname: "/statistics",
      params: { card: JSON.stringify(card) },
    });
  }

  const handleClose = useCallback(async () => {
    const storedTransactions = await getTrasactionData();
    const configTransactions: Transaction[] = dataConfig.transactions.map(
      (transaction: any) => Transaction.fromJSON(transaction)
    );

    const newTransactions = [
      ...storedTransactions.reverse(),
      ...configTransactions,
    ];

    if (JSON.stringify(transactions) !== JSON.stringify(newTransactions)) {
      setTransactions(newTransactions);
    }
  }, [transactions]);

  console.log("re render");
  return (
    <SafeAreaView style={safe_area_android.AndroidSafeArea}>
      <GestureHandlerRootView>
        <View>
          <View style={styles.container}>
            <AppBar user={user}></AppBar>
            <Text style={styles.accountText}>Account</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              persistentScrollbar={false}
              overScrollMode="never"
              data={user.cards}
              renderItem={({ item }) => (
                <CardComponent onPressFunction={handleCardPress} card={item} />
              )}
              style={styles.cardList}
            ></FlatList>
            {/* Button Row */}
            <View style={styles.buttonRow}>
              <View style={styles.buttonView}>
                <Feather name="arrow-down-left" size={26} color="black" />
                <Text style={styles.mediumText}>Request</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  openBottonSheet();
                }}
              >
                <View style={styles.buttonView}>
                  <Feather name="arrow-up-right" size={26} color="black" />
                  <Text style={styles.mediumText}>Transfer</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.circleButton}>
                <Text style={{ color: Colors.white, fontSize: 24 }}>+</Text>
              </View>
            </View>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["85%"]}
            enablePanDownToClose={true}
            index={-1}
            backgroundStyle={{ backgroundColor: "transparent" }}
            handleIndicatorStyle={{ backgroundColor: "transparent" }}
            onClose={handleClose}
          >
            <BottomSheetView style={styles.bottomSheetContentContainer}>
              <FormComponent
                cards={user.cards.map((card) => card.number)}
                closeFunction={closeBottomSheet}
              ></FormComponent>
            </BottomSheetView>
          </BottomSheet>
        </View>
        <BottomSheet
          ref={transactionBottomSheetRef}
          snapPoints={["43%", "80%"]}
          enablePanDownToClose={false}
          onChange={(index) => {
            if (index === 1) {
              setIsViewAllEnabled(true);
            }
            if (index === 0) {
              setIsViewAllEnabled(false);
            }
          }}
          index={0}
          enableHandlePanningGesture={true}
          backgroundStyle={{
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: horizontalScale(16),
              marginBottom: verticalScale(-10),
            }}
          >
            <Text style={styles.transactionText}>Transactions</Text>
            <TouchableOpacity
              onPress={() => {
                if (isViewAllEnabled) {
                  setIsViewAllEnabled(false);
                  transactionBottomSheetRef.current?.snapToIndex(0);
                } else {
                  setIsViewAllEnabled(true);
                  transactionBottomSheetRef.current?.snapToIndex(1);
                }
              }}
            >
              <Text style={styles.viewAllText}>
                View {isViewAllEnabled ? "less" : "all"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.todayText}>TODAY</Text>
          <BottomSheetFlatList
            scrollEnabled={true}
            style={styles.transactionBottomSheetContentContainer}
            data={transactions}
            renderItem={({ item, index }) => (
              <TransactionComponent
                transaction={item}
                extraBottomMargin={index === transactions.length - 1}
              />
            )}
          ></BottomSheetFlatList>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
  function openBottonSheet() {
    bottomSheetRef.current?.snapToIndex(0);
  }
  function closeBottomSheet() {
    bottomSheetRef.current?.close();
    setRefreshTransactions(!refreshTransactions);
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: verticalScale(16),
  },
  accountText: {
    fontFamily: "SfProMedium",
    fontSize: 32,
    color: Colors.balck,
    paddingTop: verticalScale(8),
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
    marginTop: verticalScale(16),
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circleButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: verticalScale(25),
    backgroundColor: Colors.balck,
    color: Colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardList: {
    paddingTop: verticalScale(8),
  },
  divider: {
    width: horizontalScale(20),
    height: verticalScale(4),
    borderRadius: verticalScale(5),
    backgroundColor: "grey",
    alignSelf: "center",
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  transactionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionList: {
    marginBottom: horizontalScale(106),
  },
  mediumText: {
    fontFamily: "SfProMedium",
    fontSize: 22,
    color: Colors.balck,
  },
  transactionText: {
    fontFamily: "SfProMedium",
    fontSize: 28,
    color: Colors.balck,
  },
  viewAllText: {
    fontFamily: "SfProMedium",
    fontSize: 14,
    color: Colors.grey,
  },
  todayText: {
    fontFamily: "SfProMedium",
    fontSize: 10,
    color: Colors.grey,
    marginRight: horizontalScale(16),
    marginLeft: horizontalScale(20),
    marginBottom: verticalScale(8),
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightBlack,
  },
  bottomSheetContentContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    marginHorizontal: horizontalScale(16),
  },
  transactionBottomSheetContentContainer: {
    backgroundColor: Colors.white,
    paddingBottom: verticalScale(100),
  },
});
