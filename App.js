import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./screens/MainTabScreen";
import RootStackScreen from "./screens/RootStackScreen";
import { DrawerContent } from "./screens/DrawerContent";
import EnquiryScreen from "./screens/EnquiryScreen";
import SplashScreen from "./screens/SplashScreen";
import { ActivityIndicator } from "react-native-paper";

import { AuthContext } from "./components/context";
import DetailsScreen from "./screens/DetailsScreen";

import AsyncStorage from "@react-native-community/async-storage";

const Drawer = createDrawerNavigator();

const App = () => {
  //const [isLoading, setIsLoading] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        // setUserToken("fgkj");
        //  setIsLoading(false);

        //Get these varialles from the database(through api call) try php

        let userToken;
        userToken = null;
        if (userName == "user" && password == "pass") {
          try {
            userToken = "dfgdfg"; //also fetched from  database video 13:31
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            console.log(e);
          }
        }
        //console.log("user token : ", userToken);
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        //setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        //setUserToken("fgkj");
        //setIsLoading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: "REGISTER", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="Details" component={DetailsScreen} />
            <Drawer.Screen name="Enquiry" component={EnquiryScreen} />
            <Drawer.Screen name="SplashScreen" component={SplashScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
