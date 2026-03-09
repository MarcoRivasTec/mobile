const handleSaveBadge = async () => {
	try {
		setIsCapturing(true);
		await settleUI();

		const rawUri = await captureRef(badgeRef, {
			format: "png",
			quality: 1,
			result: "tmpfile",
		});

		const localUri = rawUri.startsWith("file://") ? rawUri : `file://${rawUri}`;
		console.log("localUri:", localUri);

		const permission = await MediaLibrary.requestPermissionsAsync(true);
		console.log("media permission:", permission);

		if (!permission.granted) {
			showMessage({
				message:
					"Permiso de fotos denegado. Revisa los permisos e intenta de nuevo.",
				type: "warning",
				duration: 3000,
				position: "top",
				icon: { icon: "info", position: "right" },
				statusBarHeight: 30,
			});
			return;
		}

		await MediaLibrary.saveToLibraryAsync(localUri);

		showMessage({
			message: "Gafete guardado en tu galería.",
			type: "success",
			duration: 2500,
			position: "top",
			icon: { icon: "success", position: "right" },
			statusBarHeight: 30,
		});
	} catch (error) {
		console.log("SAVE BADGE ERROR:", error);
		showMessage({
			message: "No se pudo guardar el gafete. Intenta de nuevo.",
			type: "danger",
			duration: 3000,
			position: "top",
			icon: { icon: "danger", position: "right" },
			statusBarHeight: 30,
		});
	} finally {
		setIsCapturing(false);
	}
};
