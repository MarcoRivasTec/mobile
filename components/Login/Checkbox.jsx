import { View } from "react-native";
import { layout } from "./styles";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import COLORS from "../../constants/colors";

function Checkbox() {
	const [checkboxState, setCheckboxState] = React.useState(false);

	return (
		<View style={layout.checkboxContainer}>
			<BouncyCheckbox
				fillColor={COLORS.second}
				isChecked={checkboxState}
				text="Recordarme"
				textStyle={{ textDecorationLine: "none" }}
				disableBuiltInState
				onPress={() => setCheckboxState(!checkboxState)}
			/>
		</View>
	);
}

export default Checkbox;
