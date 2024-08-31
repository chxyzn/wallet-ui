import CardComponent from "@/components/Card";
import Chart from "@/components/Chart";
import MonthTab from "@/components/MonthTab";
import { Colors } from "@/constants/Colors";
import { Card } from "@/types/Card";
import { horizontalScale, verticalScale } from "@/utils/screen";
import { createIconSetFromFontello } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Statistics() {
  const card = useLocalSearchParams().card;
  const cardData = JSON.parse(card.toString());
  const cardInstance = Card.fromJSON(cardData);

  const [activeIndex, setActiveIndex] = useState(0);

  const [showChart, setShowChart] = useState(
    cardInstance.months.length > 0 &&
      cardInstance.transactions[activeIndex].length > 0
  );

  function updateSelectedMonth(index: number) {
    setActiveIndex(index);
    if (cardInstance.transactions[index].length === 0) {
      setShowChart(false);
    } else {
      setShowChart(true);
    }
  }

  console.log("re render stats");
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.body}>
        <CardComponent
          cardWidth={horizontalScale(330)}
          onPressFunction={(_) => {}}
          card={cardInstance}
          enableTouch={false}
        />
        <MonthTab
          months={cardInstance.months}
          updateParentFunction={updateSelectedMonth}
        ></MonthTab>
        {showChart ? (
          <Chart data={cardInstance.transactions[activeIndex]} />
        ) : (
          <Text style={styles.noDataFoundText}>No Data Found</Text>
        )}
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
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
  },
  noDataFoundText: {
    marginTop: verticalScale(150),
    color: Colors.balck,
    fontSize: 20,
    fontFamily: "SfProMedium",
  },
});
