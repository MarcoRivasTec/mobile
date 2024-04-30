import {
  Text,
  Animated,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef } from "react";
import COLORS from "../constants/colors";
import Logo from "../components/Logo";

const Welcome = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000); // 3 seconds to automatically change to the next screen

    return () => clearTimeout(timer); // Clears the timer
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  }, [fadeAnim]);

  return (
    <ImageBackground
      source={require("../assets/backgrounds/FONDOBIENVENIDA.png")}
      style={{ flex: 1 }}
    >
      {/* Logo */}
      <Logo></Logo>

      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text
          style={{ color: COLORS.white, fontSize: 140, marginBottom: "-10%" }}
        >
          {" "}
          Hello{" "}
        </Text>
        <Text
          style={{ color: COLORS.white, fontSize: 80, textAlign: "center" }}
        >
          {" "}
          Marcos!{" "}
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Welcome;
