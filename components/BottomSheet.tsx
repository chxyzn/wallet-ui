import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { yupResolver } from "@hookform/resolvers/yup";
import { horizontalScale, verticalScale } from "@/utils/screen";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Transaction } from "@/types/Transaction";
import { storeTransactionData } from "@/utils/storeage";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be a positive number")
    .required("Amount is required"),
  card: yup.string().required("Card is required"),
});

type FormData = {
  name: string;
  amount: number;
  card: string;
};

export default function FormComponent({
  cards,
  closeFunction,
}: {
  cards: string[];
  closeFunction: () => void;
}) {
  {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
      const now = new Date();
      const transaction = new Transaction(
        data.amount,
        data.name,
        now.toISOString(),
        0
      );

      await storeTransactionData(transaction);
      closeFunction();
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => closeFunction()}>
          <Fontisto
            name="close-a"
            size={24}
            color="black"
            style={{ alignSelf: "flex-end", marginBottom: verticalScale(16) }}
          />
        </TouchableOpacity>
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text style={styles.label}>Amount</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text.replace(/[^0-9.]/g, ""))}
              value={value ? value.toString() : ""}
            />
          )}
        />
        {errors.amount && (
          <Text style={styles.error}>{errors.amount.message}</Text>
        )}

        <Text style={styles.label}>Select Card</Text>
        <Controller
          control={control}
          name="card"
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                {cards.map((card, index) => (
                  <Picker.Item key={index} label={card} value={card} />
                ))}
              </Picker>
            </View>
          )}
        />
        {errors.card && <Text style={styles.error}>{errors.card.message}</Text>}

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.buttonStyle}>
            <Text style={{ fontFamily: "SfProMedium", fontSize: 16 }}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: verticalScale(26),
    paddingHorizontal: horizontalScale(36),
    backgroundColor: "transparent",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: "SfProMedium",
    marginBottom: horizontalScale(3),
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGrey,
    borderBottomEndRadius: horizontalScale(10),
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderColor: Colors.lightGrey,
    borderRadius: horizontalScale(42),
    borderWidth: 2,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    padding: verticalScale(10),
    alignItems: "center",
    borderRadius: horizontalScale(40),
    marginTop: verticalScale(20),
  },
  picker: {
    height: 40,
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
