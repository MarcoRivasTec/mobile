import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { confirmAction } from "./styles";

function ConfirmActionModal({
  visible,
  summaryText,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={confirmAction.modalOverlay}>
        <View style={confirmAction.modalContainer}>
          <Text style={confirmAction.modalTitle}>Confirmar solicitud</Text>

          <Text style={confirmAction.modalText}>
            {summaryText}
          </Text>

          <View style={confirmAction.modalButtons}>
            <TouchableOpacity
              style={confirmAction.modalCancel}
              onPress={onCancel}
            >
              <Text style={confirmAction.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={confirmAction.modalConfirm}
              onPress={onConfirm}
            >
              <Text style={confirmAction.modalConfirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ConfirmActionModal;