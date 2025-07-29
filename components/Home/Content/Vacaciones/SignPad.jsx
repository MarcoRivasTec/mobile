import React, { useRef } from "react";
import { View, Alert } from "react-native";
import Signature from "react-native-signature-canvas";

export default function SignPad({ onSave, signatureRef }) {
	// const ref = useRef(null);

	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<Signature
				ref={signatureRef}
				onOK={onSave}
				onEmpty={() => Alert.alert("Debes introducir una firma")}
				descriptionText="Firme aquí"
				// clearText="Limpiar"
				// confirmText="Guardar"
				autoClear={true}
				webStyle={`
          .m-signature-pad--footer { display: none; }
          body, html { height: 100%; margin: 0; }
        `}
			/>
		</View>
	);
}
