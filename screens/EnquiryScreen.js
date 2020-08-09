import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const EnquiryScreen = () => {
  return (
    <View style={StyleSheet.container}>
      <Text>Enquiry Screen</Text>
      <Button title="Click Here" onPress={() => alert("Button clicked !")} />
    </View>
  );
};
export default EnquiryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
