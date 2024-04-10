import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { login } from "./loginStyle";
import React from "react";

function Ingresar( {navigation} ) {
    return(
        <LinearGradient
            colors={[COLORS.naranja, COLORS.rojo]}
            style={{
              marginVertical: "5%",
              borderRadius: 24,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity
              style={login.button}
              onPress={() => navigation.replace("Welcome")}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                }}
              >
                Ingresar
              </Text>
            </TouchableOpacity>
          </LinearGradient>
    );
}

export default Ingresar;