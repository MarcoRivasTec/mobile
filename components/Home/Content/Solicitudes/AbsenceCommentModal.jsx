import React, { useEffect, useState } from "react";
import {
	Alert,
	Keyboard,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

function AbsenceCommentModal({
	visible,
	title,
	description,
	placeholder = "Escribe un comentario...",
	confirmText = "Confirmar",
	cancelText = "Volver",
	confirmColor = "#22A06B",
	requireComment = false,
	isSubmitting = false,
	initialComment = "",
	onCancel,
	onConfirm,
}) {
	const [comment, setComment] = useState("");

	useEffect(() => {
		if (visible) {
			setComment(initialComment || "");
		}
	}, [visible, initialComment]);

	const submitHandler = () => {
		const normalizedComment = comment.trim();

		if (requireComment && normalizedComment === "") {
			Alert.alert("Comentario requerido", "Debes agregar un comentario.");
			return;
		}

		onConfirm(normalizedComment);
	};

	return (
		<Modal
			animationType="fade"
			transparent
			visible={visible}
			onRequestClose={onCancel}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.background}>
					<View style={styles.modalContainer}>
						<Text style={styles.title}>{title}</Text>

						{description ? (
							<Text style={styles.description}>{description}</Text>
						) : null}

						<TextInput
							style={styles.input}
							placeholder={placeholder}
							placeholderTextColor="#888"
							multiline
							maxLength={200}
							value={comment}
							onChangeText={setComment}
							textAlignVertical="top"
						/>

						<Text style={styles.counter}>{comment.length}/200</Text>

						<View style={styles.buttonsContainer}>
							<TouchableOpacity
								disabled={isSubmitting}
								onPress={submitHandler}
								style={[
									styles.button,
									{ backgroundColor: confirmColor },
									isSubmitting && styles.disabledButton,
								]}
							>
								<Text style={styles.buttonText}>
									{isSubmitting ? "Procesando..." : confirmText}
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								disabled={isSubmitting}
								onPress={onCancel}
								style={[
									styles.button,
									styles.cancelButton,
									isSubmitting && styles.disabledButton,
								]}
							>
								<Text style={styles.buttonText}>{cancelText}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.45)",
		justifyContent: "center",
		alignItems: "center",
	},

	modalContainer: {
		width: "88%",
		backgroundColor: "white",
		borderRadius: 14,
		padding: 18,
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#222",
		marginBottom: 6,
	},

	description: {
		fontSize: 14,
		color: "#666",
		lineHeight: 19,
		marginBottom: 14,
	},

	input: {
		width: "100%",
		minHeight: 120,
		borderWidth: 1,
		borderColor: "#D9D9D9",
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: "#222",
		backgroundColor: "#FAFAFA",
	},

	counter: {
		marginTop: 5,
		fontSize: 12,
		color: "#777",
		textAlign: "right",
	},

	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
		marginTop: 16,
	},

	button: {
		flex: 1,
		borderRadius: 9,
		paddingVertical: 11,
		alignItems: "center",
		justifyContent: "center",
	},

	cancelButton: {
		backgroundColor: "#F28C28",
	},

	disabledButton: {
		opacity: 0.6,
	},

	buttonText: {
		fontSize: 14,
		fontWeight: "700",
		color: "white",
	},
});

export default AbsenceCommentModal;
