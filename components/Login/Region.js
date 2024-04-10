import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import SVGRegion from "../../assets/icons/REGION.svg";
import { login } from "./loginStyle";
import React, { useState } from "react";


function Region() {

  const [selectedValue, setSelectedValue] = useState("null");

  return (
    <View style={login.field}>
      <View style={[login.iconBox]}>
        <SVGRegion width="60%" height="60%" style={login.svg} />
      </View>

      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        itemStyle={{height: 50}}
        style={login.picker}
      >
        <Picker.Item 
        label="Región" 
        style={login.pickerItem} 
        value="{null}" 
        />
        <Picker.Item
          label="Cd. Juárez"
          style={login.pickerItem}
          value="juarez"
        />
        <Picker.Item 
        label="Tijuana" 
        style={login.pickerItem} 
        value="tijuana" 
        />
        <Picker.Item 
        label="Monterrey" 
        style={login.pickerItem} 
        value="mty" 
        />
        <Picker.Item
          label="Monterrey Living Spaces"
          style={login.pickerItem}
          value="mtyliving"
        />
        <Picker.Item
          label="Saltillo"
          style={login.pickerItem}
          value="saltillo"
        />
        <Picker.Item 
        label="Amamex" 
        style={login.pickerItem} 
        value="amamex" 
        />
        {/* Add more Picker.Item components for additional options */}
      </Picker>
    </View>
  );
}

export default Region;
