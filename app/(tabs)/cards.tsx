import AppBar from "@/components/AppBar";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import dataConfig from "../../data.config.json";
import safe_area_android from "@/constants/safe_area_android";
import { Colors } from "@/constants/Colors";
import { horizontalScale, verticalScale } from "@/utils/screen";
import FilppedCard from "@/components/FilppedCard";

export default function TabTwoScreen() {
  const [user, setUser] = useState<User>(
    new User(
      "",
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      []
    )
  );
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const user: User = User.fromJSON(dataConfig.user);
    setUser(user);
    setLoaded(true);
  }, []);

  return (
    <SafeAreaView
      style={{
        ...safe_area_android.AndroidSafeArea,
        backgroundColor: Colors.lightGrey,
      }}
    >
      <ScrollView overScrollMode="never" style={styles.container}>
        <AppBar user={user}></AppBar>
        <Text style={styles.title}>My Card</Text>
        {!loaded ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.cardView}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              persistentScrollbar={false}
              overScrollMode="never"
              data={user.cards}
              renderItem={({ item }) => <FilppedCard card={item} />}
            ></FlatList>
          </View>
        )}
        <View style={styles.button}>
          <Text
            style={{
              fontFamily: "SfProMedium",
              fontSize: 16,
            }}
          >
            Add New Card
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: "SfProMedium",
    color: Colors.balck,
    marginTop: verticalScale(12),
  },
  container: {
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(16),
    marginTop: verticalScale(36.5),
    backgroundColor: Colors.lightGrey,
    height: "100%",
  },
  cardView: {
    marginTop: verticalScale(16),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  },
  button: {
    width: horizontalScale(320),
    paddingVertical: verticalScale(14),
    borderRadius: horizontalScale(20),
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.primary,
    marginBottom: verticalScale(120),
    alignSelf: "center",
  },
});
