import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { modal } from "./styles";
import React from "react";
import RegionPicker from "./RegionPicker";

function RegionModal({ isModalVisible, onCallback, region, setRegion}) {
	return (
		<View style={modal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				// onRequestClose={onCallback}
			>
				<TouchableWithoutFeedback onPress={onCallback} accessible={false}>
					<View style={modal.backgroundContainer}></View>
				</TouchableWithoutFeedback>
				<View style={modal.modalContainer}>
					<View style={modal.contentContainer}>
						<View style={modal.picker}>
							<RegionPicker region={region} setRegion={setRegion} onCallback={onCallback}/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default RegionModal;
