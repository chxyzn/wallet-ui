import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import dataConfig from "../data.config.json";
import { ChartData } from "@/types/ChartData";
import { Colors } from "@/constants/Colors";
import { verticalScale } from "@/utils/screen";

const screenWidth = Dimensions.get("window").width;

const data: number = 20.67;
export default function TransactionChart({ data }: { data: number[] }) {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu"],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={screenWidth * 0.9} // from react-native
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: verticalScale(50),
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
