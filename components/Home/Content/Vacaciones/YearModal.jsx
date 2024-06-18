import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { yearModal } from "./styles";
import React from "react";
import YearPicker from "./YearPicker";

function YearModal({
	isYearModalVisible,
	onCallback,
	years,
	selectedYear,
	setSelectedYear,
}) {
	return (
		<View style={yearModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isYearModalVisible}
				// onRequestClose={onCallback}
			>
				<TouchableWithoutFeedback
					onPress={onCallback}
					accessible={false}
				>
					<View style={yearModal.backgroundContainer}></View>
				</TouchableWithoutFeedback>
				<View style={yearModal.modalContainer}>
					<View style={yearModal.contentContainer}>
						<View style={yearModal.picker}>
							<YearPicker
								years={years}
								selectedYear={selectedYear}
								setSelectedYear={setSelectedYear}
								onCallback={onCallback}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default YearModal;
