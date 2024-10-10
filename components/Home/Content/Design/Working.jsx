import React, { useEffect } from "react";
import { Modal, View, Text } from "react-native";
import { working } from "./styles";
import LoadingContent from "../../../Animations/LoadingContent";

function Working({
	isModalVisible,
	onCallback,
	onExit,
}) {
	return (
		<View style={working.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={onCallback}
			>
				<View style={working.backgroundContainer}>
					<View style={working.modalContainer}>
						<View style={working.contentContainer}>
							{/* Title */}
							<View style={working.animContainer}>
								<View style={working.anim}>
									<LoadingContent />
								</View>
							</View>

							{/* Text */}
							<Text style={working.text}>
								Procesando ...
							</Text>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Working;
