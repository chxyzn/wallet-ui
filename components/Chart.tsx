import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Colors } from "@/constants/Colors";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/screen";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const screenWidth = Dimensions.get("window").width;

export default function TransactionChart({ data }: { data: number[] }) {
  const [selectedLanguage, setSelectedLanguage] = useState("Expenses");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transactions</Text>
        <View style={styles.picker}>
          <Text style={styles.earningsText}>Earnings</Text>
          <AntDesign name="down" size={moderateScale(16)} color="black" />
        </View>
      </View>
      <LineChart
        data={{
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu"],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={screenWidth}
        height={verticalScale(180)}
        fromZero={true}
        yAxisLabel="$"
        yAxisSuffix=""
        withHorizontalLabels={false}
        withHorizontalLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundColor: Colors.white,
          backgroundGradientFrom: Colors.white,
          backgroundGradientTo: Colors.white,

          decimalPlaces: 2,
          height: 100,
          color: (opacity = 1) => Colors.primary,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            padding: 0,
            flex: 1,
            display: "flex",
            backgroundColor: "red",
            margin: 0,
            paddingRight: 0,
            marginRight: 0,
            paddingLeft: 0,
            marginLeft: 0,
          },

          propsForDots: {
            r: "6",
            strokeWidth: "3",
            fill: Colors.primary,
            stroke: Colors.white,
          },
        }}
        bezier
        renderDotContent={({ x, y, index, indexData }) => (
          <View
            key={index}
            style={{
              position: "absolute",
              top: y - 20,
              left: x - 10,
            }}
          >
            <Text style={{ fontSize: 12, color: "black" }}>${indexData}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(50),
  },
  headerText: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: horizontalScale(50),
    marginBottom: verticalScale(20),
  },
  picker: {
    backgroundColor: Colors.lightGrey,
    width: horizontalScale(90),
    borderRadius: horizontalScale(30),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(5),
  },
  earningsText: {
    color: Colors.balck,
    fontSize: 12,
    fontFamily: "SfProMedium",
  },
});
