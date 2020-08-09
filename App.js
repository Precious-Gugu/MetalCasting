import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./screens/MainTabScreen";
import RootStackScreen from "./screens/RootStackScreen";
import { DrawerContent } from "./screens/DrawerContent";
import EnquiryScreen from "./screens/EnquiryScreen";
import SplashScreen from "./screens/SplashScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/*  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
         <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Enquiry" component={EnquiryScreen} />
        <Drawer.Screen name="SplashScreen" component={SplashScreen} />
      </Drawer.Navigator>*/}
    </NavigationContainer>
  );
};
export default App;
