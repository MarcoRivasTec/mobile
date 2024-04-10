import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { handleTextChange } from "../Login/textCheck";
import { login } from "./loginStyle";
import COLORS from "../../constants/colors";
import SVGUser from "../../assets/icons/USUARIO.svg";

function User() {
  const [inputValue, setInputValue] = useState("");

  return (
    <View style={login.field}>
      <View style={[login.iconBox, { backgroundColor: COLORS.primary }]}>
        <SVGUser width="60%" height="60%" style={login.svg} />
      </View>

      <TextInput
        placeholder="Número de empleado"
        placeholderTextColor={COLORS.placeholder}
        keyboardType="number-pad"
        inputMode="numeric"
        value={inputValue}
        onChangeText={(text) => handleTextChange(text, setInputValue)}
        maxLength={12}
        style={login.userInput}
      />
    </View>
  );
}

export default User;
