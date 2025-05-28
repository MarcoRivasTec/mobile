import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { dataModal } from "./styles";
import React from "react";
import DataPicker from "./DataPicker";

function DataModal({
	isDataModalVisible,
	onCallback,
	data,
	selectedElement,
	setSelectedElement,
}) {
	return (
		<View style={dataModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isDataModalVisible}
				// onRequestClose={onCallback}
			>
				<TouchableWithoutFeedback
					onPress={onCallback}
					accessible={false}
				>
					<View style={dataModal.backgroundContainer}></View>
				</TouchableWithoutFeedback>
				<View style={dataModal.modalContainer}>
					<View style={dataModal.contentContainer}>
						<View style={dataModal.picker}>
							<DataPicker
								data={data}
								selectedElement={selectedElement}
								setSelectedElement={setSelectedElement}
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

