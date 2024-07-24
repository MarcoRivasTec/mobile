import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { yearModal } from "./styles";
import React from "react";
import DataPicker from "./DataPicker";

function DataModal({
	isModalVisible,
	onCallback,
	data,
	selectedData,
	setSelectedData,
}) {
	return (
		<View style={yearModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
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
							<DataPicker
								data={data}
								selectedData={selectedData}
								setSelectedData={setSelectedData}
								onCallback={onCallback}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default DataModal;
