import { Colors } from "@/constants/Colors";
import { moderateScale, verticalScale } from "@/utils/screen";
import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function MonthTab({
  months,
  updateParentFunction,
}: {
  months: string[];
  updateParentFunction: (month: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <View style={styles.contaier}>
      {months.map((month, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setActiveIndex(index);
            updateParentFunction(index);
          }}
        >
          <View
            style={{
              ...styles.individual,
              backgroundColor:
                index == activeIndex ? Colors.primary : Colors.lightGrey,
            }}
          >
            <Text>{month}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contaier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: verticalScale(52),
    backgroundColor: Colors.lightGrey,
    borderRadius: verticalScale(26),
    marginTop: verticalScale(30),
  },
  individual: {
    width: verticalScale(52),
    height: verticalScale(52),
    borderRadius: verticalScale(26),
    backgroundColor: Colors.lightGrey,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
