import { View, TouchableOpacity, Text, Platform } from "react-native";
import { layout } from "./styles";
import React from "react";
import Icon from "../Home/icons";
import DownArrow from "../Animations/DownArrow";
import RegionPicker from "./RegionPicker";

function Region({ modalHandler, region, setRegion }) {
	return (
		<View style={layout.fieldContainer}>
			<View style={layout.iconBox}>
				<Icon name="REGION" size={26} style={layout.icon} />
			</View>
			{Platform.OS === "ios" ? (
				<TouchableOpacity onPress={modalHandler} style={layout.field}>
					<Text style={layout.fieldText}>
						{region}
					</Text>
					<View style={layout.arrowContainer}>
						<DownArrow />
					</View>
				</TouchableOpacity>
			) : (
				<View style={layout.field}>
					<RegionPicker region={region} setRegion={setRegion} />
				</View>
			)}
		</View>
	);
}

export default Region;
