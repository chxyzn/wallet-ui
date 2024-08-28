import CardComponent from "@/components/Card";
import Chart from "@/components/Chart";
import MonthTab from "@/components/MonthTab";
import { Colors } from "@/constants/Colors";
import { Card } from "@/types/Card";
import { horizontalScale } from "@/utils/screen";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Statistics() {
  const card = useLocalSearchParams().card;
  const cardData = JSON.parse(card.toString());
  const cardInstance = new Card(
    cardData.number,
    cardData.balance,
    cardData.currency,
    cardData.validity,
    cardData.cardType,
    cardData.currencyFlagImgUrl,
    cardData.months,
    cardData.transactions
  );

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.body}>
        <CardComponent
          cardWidth={horizontalScale(330)}
          onPressFunction={(_) => {}}
          card={cardInstance}
        />
        <MonthTab
          months={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]}
        ></MonthTab>
        <Chart data={[12, 11, 1]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});
