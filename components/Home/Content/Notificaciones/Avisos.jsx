import React, { useMemo, useState, useCallback } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Modal,
	Pressable,
	Linking,
} from "react-native";
import { avisos } from "./styles";
import LoadingContent from "../../../Animations/LoadingContent";
import { HomeContext } from "../../../HomeContext";
// If you already use vector icons, uncomment and install:
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/**
 * Props:
 * - isLoading: boolean
 * - notifications: Array<{ id, title, message, created_at, files: [{id, file_name}] }>
 * - onFilePress?: async (notificationId, fileId) => void
 *      (Optional) If provided, called when a file row is pressed. You can
 *      fetch NotificationFileUrl and open it (Linking.openURL) in there.
 */
function Avisos({ isLoading, notifications = [], onFilePress }) {
	const [selected, setSelected] = useState(null); // the notification object
	const [open, setOpen] = useState(false);

	const hasData = useMemo(
		() => Array.isArray(notifications) && notifications.length > 0,
		[notifications]
	);

	const openModal = useCallback((n) => {
		setSelected(n);
		setOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setOpen(false);
		setSelected(null);
	}, []);

	const renderItem = ({ item }) => {
		const filesCount = item?.files?.length || 0;
		const created = new Date(item.created_at).toLocaleDateString("es-MX", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});

		return (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => openModal(item)}
				style={avisos.card}
			>
				<View style={avisos.cardHeader}>
					<Text style={avisos.cardTitle} numberOfLines={1}>
						{item.title}
					</Text>
					<Text style={avisos.cardDate}>{created}</Text>
				</View>

				<Text style={avisos.cardMessage} numberOfLines={2}>
					{item.message}
				</Text>

				{filesCount > 0 && (
					<View style={avisos.attachRow}>
						{/* <Icon name="paperclip" size={16} style={avisos.attachIcon} /> */}
						<Text style={avisos.attachEmoji}>📎</Text>
						<Text style={avisos.attachText}>
							{filesCount === 1
								? "1 archivo adjunto"
								: `${filesCount} archivos adjuntos`}
						</Text>
					</View>
				)}
			</TouchableOpacity>
		);
	};

	const renderFile = ({ item }) => {
		const onPressFile = async () => {
			// Optional: caller can handle download by providing onFilePress
			if (typeof onFilePress === "function") {
				await onFilePress(selected.id, item.id);
				return;
			}
			// Fallback: do nothing or show a hint. You can plug Linking here once you have a URL.
			// Example if you already have a direct URL: await Linking.openURL(url);
		};

		return (
			<Pressable onPress={onPressFile} style={avisos.fileRow}>
				{/* <Icon name="file-download-outline" size={18} style={avisos.fileIcon} /> */}
				<Text style={avisos.fileEmoji}>📄</Text>
				<Text numberOfLines={1} style={avisos.fileName}>
					{item.file_name}
				</Text>
				{/* You could add a small "Descargar" text/button on the right if desired */}
			</Pressable>
		);
	};

	if (isLoading) {
		return (
			<View style={avisos.container}>
				<LoadingContent />
			</View>
		);
	}

	if (!hasData) {
		return (
			<View style={avisos.container}>
				<View style={avisos.titleContainer}>
					<Text style={avisos.titleText}>No hay avisos disponibles</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={avisos.container}>
			<FlatList
				data={notifications}
				keyExtractor={(item) => String(item.id)}
				renderItem={renderItem}
				contentContainerStyle={avisos.listContent}
			/>

			{/* Modal with full notification + files */}
			<Modal
				visible={open}
				animationType="slide"
				transparent
				onRequestClose={closeModal}
			>
				<View style={avisos.modalOverlay}>
					<View style={avisos.modalCard}>
						<View style={avisos.modalHeader}>
							<Text style={avisos.modalTitle} numberOfLines={2}>
								{selected?.title}
							</Text>
							<Pressable onPress={closeModal} hitSlop={8}>
								{/* <Icon name="close" size={22} /> */}
								<Text style={avisos.closeEmoji}>✖</Text>
							</Pressable>
						</View>

						<Text style={avisos.modalDate}>
							{selected?.created_at
								? new Date(selected.created_at).toLocaleString("es-MX", {
										day: "2-digit",
										month: "short",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
								  })
								: ""}
						</Text>

						<View style={avisos.modalBody}>
							<Text style={avisos.modalMessage}>{selected?.message}</Text>
						</View>

						{selected?.files?.length > 0 && (
							<View style={avisos.filesSection}>
								<Text style={avisos.filesTitle}>Archivos adjuntos</Text>
								<FlatList
									data={selected.files}
									keyExtractor={(f) => String(f.id)}
									renderItem={renderFile}
								/>
							</View>
						)}
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Avisos;
