import { Tabs } from "expo-router";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { moderateScale } from "@/utils/screen";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.lightGrey,
          borderTopWidth: 1,
          height: moderateScale(60),
          width: "50%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          borderRadius: moderateScale(20),
          position: "absolute",
          bottom: moderateScale(40),
          left: "25%",
          right: "25%",
          shadowColor: Colors.balck,
          shadowOffset: {
            width: 100,
            height: 100,
          },
          shadowOpacity: 1,

          elevation: 10,
          shadowRadius: 199,
        },

        headerShadowVisible: true,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarActiveTintColor: Colors.balck,
          tabBarInactiveTintColor: Colors.lightBlack,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={moderateScale(24)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "Explore",
          tabBarActiveTintColor: Colors.balck,
          tabBarInactiveTintColor: Colors.lightBlack,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="line-scan"
              size={moderateScale(24)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarActiveTintColor: Colors.balck,
          tabBarInactiveTintColor: Colors.lightBlack,
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons
              name="credit-card"
              size={moderateScale(24)}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
