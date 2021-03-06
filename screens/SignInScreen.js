import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";

import * as Animatable from "react-native-animatable";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import SignUpScreen from "./SignUpScreen";
import MainTabScreen from "./MainTabScreen";
import HomeScreen from "./HomeScreen";
import App from "../App";
import EnquiryScreen from "./EnquiryScreen";

import { AuthContext } from "../components/context";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { signIn } = React.useContext(AuthContext);
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (username, password) => {
    signIn(username, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#853500" barStyle="Light-content" />
      <Image
        style={[styles.logo, { alignSelf: "center" }, { marginTop: 15 }]}
        source={require("../assets/mtcm.png")}
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>User Login</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="black" size={20} />

          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />

          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="black" size={20} />

          <TextInput
            placeholder="Your passowrd"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />

          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={{ color: "#853500", marginTop: 15 }}>
            Forgot Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            loginHandle(data.username, data.password);
          }}
          style={[
            styles.signIn,
            { backgroundColor: "#cb5c0d" },
            { marginTop: 40 },
          ]}
        >
          <Text style={[styles.textSign, { color: "white" }]}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(SignUpScreen)}
          style={[
            styles.signIn,
            { borderColor: "#853500", borderWidth: 1, marginTop: 15 },
          ]}
        >
          <Text style={[styles.textSign, { color: "#853500" }]}>Register</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cb5c0d",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 8,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  },

  text_footer: {
    color: "#05357a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },

  button: {
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#cb5c0d",
    marginLeft: 10,
    marginRight: 20,
    margin: 10,
    borderRadius: 10,
  },
  button2: {
    alignItems: "center",
    marginTop: 50,
    borderColor: "#009387",
    marginLeft: 10,
    marginRight: 20,
    margin: 10,
    borderRadius: 10,
  },

  signIn: {
    width: "100%",
    borderWidth: 1,
    paddingTop: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    height: 130,
    width: 210,
  },
});
