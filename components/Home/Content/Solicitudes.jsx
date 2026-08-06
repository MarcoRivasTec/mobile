import React, { useCallback, useContext, useEffect, useState } from "react";
import {
	Alert,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { solicitudes } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonAction from "./Buttons/ButtonAction";
import SolVacaciones from "./Solicitudes/SolVacaciones";
import SolPermisos from "./Solicitudes/SolPermisos";
import LoadingContent from "../../Animations/LoadingContent";
import fetchPost from "../../fetching";
import { HomeContext } from "../../HomeContext";
import AbsenceCommentModal from "./Solicitudes/AbsenceCommentModal";

const ABSENCE_STATUS = {
	PENDING: 1,
	PRE_APPROVED: 2,
	APPROVED: 3,
	REJECTED: 4,
	CANCELLED: 5,
};

const GET_EMPLOYEE_ABSENCE_REQUESTS = `
	query GetEmployeeAbsenceRequests($input: EmployeeAbsenceRequestsInput) {
		getEmployeeAbsenceRequests(input: $input) {
			id
			employeeId
			employeeName
			requestTypeId
			requestType
			statusId
			status
			reasonId
			reason
			startDate
			endDate
			requestedAt
			totalDays
			employeeComment
			cancelledAt
			cancellationComment
			preApprovedBySupervisorAppId
			preApprovedAt
			approvedByHRId
			approvedAt
			rejectedBySupervisorAppId
			rejectedByHRId
			rejectedAt
			supervisorComment
			hrComment
		}
	}
`;

const GET_SUPERVISOR_ABSENCE_REQUESTS = `
	query GetSupervisorAbsenceRequests($input: SupervisorAbsenceRequestsInput) {
		getSupervisorAbsenceRequests(input: $input) {
			id
			employeeId
			employeeName
			requestTypeId
			requestType
			statusId
			status
			reasonId
			reason
			startDate
			endDate
			requestedAt
			totalDays
			employeeComment
			supervisorComment
		}
	}
`;

const CANCEL_ABSENCE_REQUEST = `
	mutation CancelAbsenceRequest($input: CancelAbsenceRequestInput!) {
		cancelAbsenceRequest(input: $input) {
			success
			message
		}
	}
`;

const HANDLE_SUPERVISOR_ABSENCE_REQUEST = `
	mutation HandleSupervisorAbsenceRequest($input: HandleSupervisorAbsenceRequestInput!) {
		handleSupervisorAbsenceRequest(input: $input) {
			success
			message
		}
	}
`;

const STATUS_COLORS = {
	1: "#F2B84B",
	2: "#3B82F6",
	3: "#22A06B",
	4: "#D64545",
	5: "#777777",
};

function formatDate(value) {
	if (!value) return "-";

	const dateValue = value.toString();
	const datePart = dateValue.split("T")[0];
	const parts = datePart.split("-");

	if (parts.length === 3) {
		const [year, month, day] = parts;
		return `${day}/${month}/${year}`;
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) return "-";

	return date.toLocaleDateString("es-MX", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

function EmptyState({ text }) {
	return (
		<View style={solicitudes.emptyContainer}>
			<Text style={solicitudes.emptyText}>{text}</Text>
		</View>
	);
}

function RequestCard({
	item,
	showEmployeeName = false,
	showEmployeeActions = false,
	showSupervisorActions = false,
	onCancel,
	onApprove,
	onReject,
	isActionLoading = false,
}) {
	const statusColor = STATUS_COLORS[item.statusId] || "#777777";

	const canCancel =
		showEmployeeActions &&
		(item.statusId === ABSENCE_STATUS.PENDING ||
			item.statusId === ABSENCE_STATUS.PRE_APPROVED);

	const canSupervisorHandle =
		showSupervisorActions && item.statusId === ABSENCE_STATUS.PENDING;

	return (
		<View style={solicitudes.requestCard}>
			<View style={solicitudes.requestCardHeader}>
				<View style={solicitudes.requestTitleContainer}>
					<Text style={solicitudes.requestTypeText}>
						{item.requestType || "Solicitud"}
					</Text>

					{showEmployeeName && (
						<Text style={solicitudes.employeeNameText}>
							{item.employeeName || item.employeeId}
						</Text>
					)}
				</View>

				<View
					style={[
						solicitudes.statusPill,
						{
							backgroundColor: statusColor,
						},
					]}
				>
					<Text style={solicitudes.statusPillText}>
						{item.status || "Sin estado"}
					</Text>
				</View>
			</View>

			<View style={solicitudes.requestInfoRow}>
				<Text style={solicitudes.requestInfoLabel}>Periodo</Text>
				<Text style={solicitudes.requestInfoValue}>
					{formatDate(item.startDate)} - {formatDate(item.endDate)}
				</Text>
			</View>

			<View style={solicitudes.requestInfoRow}>
				<Text style={solicitudes.requestInfoLabel}>Días</Text>
				<Text style={solicitudes.requestInfoValue}>{item.totalDays}</Text>
			</View>

			{item.reason && (
				<View style={solicitudes.requestInfoRow}>
					<Text style={solicitudes.requestInfoLabel}>Motivo</Text>
					<Text style={solicitudes.requestInfoValue}>{item.reason}</Text>
				</View>
			)}

			{item.employeeComment && (
				<View style={solicitudes.commentContainer}>
					<Text style={solicitudes.commentLabel}>Comentario</Text>
					<Text style={solicitudes.commentText}>{item.employeeComment}</Text>
				</View>
			)}

			{item.supervisorComment && (
				<View style={solicitudes.commentContainer}>
					<Text style={solicitudes.commentLabel}>Comentario supervisor</Text>
					<Text style={solicitudes.commentText}>{item.supervisorComment}</Text>
				</View>
			)}

			{item.hrComment && (
				<View style={solicitudes.commentContainer}>
					<Text style={solicitudes.commentLabel}>Comentario RH</Text>
					<Text style={solicitudes.commentText}>{item.hrComment}</Text>
				</View>
			)}

			{item.cancellationComment && (
				<View style={solicitudes.commentContainer}>
					<Text style={solicitudes.commentLabel}>Comentario cancelación</Text>
					<Text style={solicitudes.commentText}>
						{item.cancellationComment}
					</Text>
				</View>
			)}

			{canCancel && (
				<View style={solicitudes.cardActionsContainer}>
					<TouchableOpacity
						disabled={isActionLoading}
						onPress={() => onCancel(item)}
						style={[
							solicitudes.cardActionButton,
							solicitudes.cancelButton,
							isActionLoading && solicitudes.disabledButton,
						]}
					>
						<Text style={solicitudes.cardActionButtonText}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			)}

			{canSupervisorHandle && (
				<View style={solicitudes.cardActionsContainer}>
					<TouchableOpacity
						disabled={isActionLoading}
						onPress={() => onApprove(item)}
						style={[
							solicitudes.cardActionButton,
							solicitudes.approveButton,
							isActionLoading && solicitudes.disabledButton,
						]}
					>
						<Text style={solicitudes.cardActionButtonText}>Pre-aprobar</Text>
					</TouchableOpacity>

					<TouchableOpacity
						disabled={isActionLoading}
						onPress={() => onReject(item)}
						style={[
							solicitudes.cardActionButton,
							solicitudes.rejectButton,
							isActionLoading && solicitudes.disabledButton,
						]}
					>
						<Text style={solicitudes.cardActionButtonText}>Rechazar</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

function Solicitudes() {
	const { accessToken, isSupervisor } = useContext(HomeContext);

	const [isPermModalVisible, setPermModalVisible] = useState(false);
	const [isVacModalVisible, setVacModalVisible] = useState(false);

	const [employeeRequests, setEmployeeRequests] = useState([]);
	const [supervisorRequests, setSupervisorRequests] = useState([]);

	const [isEmployeeLoading, setEmployeeLoading] = useState(false);
	const [isSupervisorLoading, setSupervisorLoading] = useState(false);
	const [isRefreshing, setRefreshing] = useState(false);
	const [actionLoadingId, setActionLoadingId] = useState(null);

	const [commentModal, setCommentModal] = useState({
		visible: false,
		mode: null,
		request: null,
		title: "",
		description: "",
		confirmText: "",
		confirmColor: "#22A06B",
		requireComment: false,
	});

	const fetchEmployeeRequests = useCallback(async () => {
		if (!accessToken) return;

		setEmployeeLoading(true);

		try {
			const query = {
				query: GET_EMPLOYEE_ABSENCE_REQUESTS,
				variables: {
					input: {},
				},
			};

			const response = await fetchPost({ query, token: accessToken });
			const requests = response?.data?.getEmployeeAbsenceRequests || [];

			setEmployeeRequests(requests);
		} catch (error) {
			console.error("Error fetching employee absence requests:", error);

			Alert.alert(
				"Error",
				"No fue posible obtener tus solicitudes. Intenta nuevamente.",
			);
		} finally {
			setEmployeeLoading(false);
		}
	}, [accessToken]);

	const fetchSupervisorRequests = useCallback(async () => {
		if (!accessToken || !isSupervisor) return;

		setSupervisorLoading(true);

		try {
			const query = {
				query: GET_SUPERVISOR_ABSENCE_REQUESTS,
				variables: {
					input: {
						statusId: ABSENCE_STATUS.PENDING,
					},
				},
			};

			const response = await fetchPost({ query, token: accessToken });
			const requests = response?.data?.getSupervisorAbsenceRequests || [];

			setSupervisorRequests(requests);
		} catch (error) {
			console.error("Error fetching supervisor absence requests:", error);

			Alert.alert(
				"Error",
				"No fue posible obtener las solicitudes por aprobar.",
			);
		} finally {
			setSupervisorLoading(false);
		}
	}, [accessToken, isSupervisor]);

	const refreshRequests = useCallback(async () => {
		setRefreshing(true);

		try {
			await Promise.all([
				fetchEmployeeRequests(),
				isSupervisor ? fetchSupervisorRequests() : Promise.resolve(),
			]);
		} finally {
			setRefreshing(false);
		}
	}, [fetchEmployeeRequests, fetchSupervisorRequests, isSupervisor]);

	useEffect(() => {
		refreshRequests();
	}, [refreshRequests]);

	function permisosModalHandler() {
		setPermModalVisible((current) => !current);
	}

	function vacacionesModalHandler() {
		setVacModalVisible((current) => !current);
	}

	function closePermisosModal() {
		setPermModalVisible(false);
		refreshRequests();
	}

	function closeVacacionesModal() {
		setVacModalVisible(false);
		refreshRequests();
	}

	const closeCommentModal = () => {
		setCommentModal({
			visible: false,
			mode: null,
			request: null,
			title: "",
			description: "",
			confirmText: "",
			confirmColor: "#22A06B",
			requireComment: false,
		});
	};

	const openCancelModal = (request) => {
		setCommentModal({
			visible: true,
			mode: "cancel",
			request,
			title: "Cancelar solicitud",
			description: "Puedes agregar un comentario para explicar la cancelación.",
			confirmText: "Cancelar solicitud",
			confirmColor: "#D64545",
			requireComment: false,
		});
	};

	const openApproveModal = (request) => {
		setCommentModal({
			visible: true,
			mode: "approve",
			request,
			title: "Pre-aprobar solicitud",
			description: `Agrega un comentario para la solicitud de ${request.employeeName}.`,
			confirmText: "Pre-aprobar",
			confirmColor: "#22A06B",
			requireComment: false,
		});
	};

	const openRejectModal = (request) => {
		setCommentModal({
			visible: true,
			mode: "reject",
			request,
			title: "Rechazar solicitud",
			description: `Agrega el motivo del rechazo para la solicitud de ${request.employeeName}.`,
			confirmText: "Rechazar",
			confirmColor: "#D64545",
			requireComment: true,
		});
	};

	const cancelRequest = async (request, comment) => {
		try {
			setActionLoadingId(request.id);

			const query = {
				query: CANCEL_ABSENCE_REQUEST,
				variables: {
					input: {
						request_id: request.id,
						...(comment && { comment }),
					},
				},
			};

			const response = await fetchPost({ query, token: accessToken });
			const result = response?.data?.cancelAbsenceRequest;

			if (result?.success) {
				Alert.alert("Solicitud cancelada", result.message);
				await refreshRequests();
				return true;
			}

			Alert.alert(
				"Error",
				result?.message || "No fue posible cancelar la solicitud.",
			);

			return false;
		} catch (error) {
			console.error("Error cancelling absence request:", error);

			Alert.alert("Error", "Ocurrió un error al cancelar la solicitud.");
			return false;
		} finally {
			setActionLoadingId(null);
		}
	};

	const confirmCancelRequest = (request) => {
		Alert.alert("Cancelar solicitud", "¿Deseas cancelar esta solicitud?", [
			{
				text: "No",
				style: "cancel",
			},
			{
				text: "Sí, cancelar",
				style: "destructive",
				onPress: () => cancelRequest(request),
			},
		]);
	};

	const handleSupervisorRequest = async (request, action, comment) => {
		try {
			setActionLoadingId(request.id);

			const query = {
				query: HANDLE_SUPERVISOR_ABSENCE_REQUEST,
				variables: {
					input: {
						request_id: request.id,
						action,
						...(comment && { comment }),
					},
				},
			};

			const response = await fetchPost({ query, token: accessToken });
			const result = response?.data?.handleSupervisorAbsenceRequest;

			if (result?.success) {
				Alert.alert("Solicitud actualizada", result.message);
				await refreshRequests();
				return true;
			}

			Alert.alert(
				"Error",
				result?.message || "No fue posible procesar la solicitud.",
			);

			return false;
		} catch (error) {
			console.error("Error handling supervisor absence request:", error);

			Alert.alert("Error", "Ocurrió un error al procesar la solicitud.");
			return false;
		} finally {
			setActionLoadingId(null);
		}
	};

	const confirmApproveRequest = (request) => {
		Alert.alert(
			"Pre-aprobar solicitud",
			`¿Deseas pre-aprobar la solicitud de ${request.employeeName}?`,
			[
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Sí, pre-aprobar",
					onPress: () => handleSupervisorRequest(request, "approve"),
				},
			],
		);
	};

	const confirmRejectRequest = (request) => {
		Alert.alert(
			"Rechazar solicitud",
			`¿Deseas rechazar la solicitud de ${request.employeeName}?`,
			[
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Sí, rechazar",
					style: "destructive",
					onPress: () => handleSupervisorRequest(request, "reject"),
				},
			],
		);
	};

	const submitCommentModal = async (comment) => {
		const { mode, request } = commentModal;

		if (!mode || !request) return;

		let success = false;

		if (mode === "cancel") {
			success = await cancelRequest(request, comment);
		}

		if (mode === "approve") {
			success = await handleSupervisorRequest(request, "approve", comment);
		}

		if (mode === "reject") {
			success = await handleSupervisorRequest(request, "reject", comment);
		}

		if (success) {
			closeCommentModal();
		}
	};

	return (
		<View style={solicitudes.container}>
			<ContentHeader title="Solicitudes" />

			<View style={{ width: "100%", flex: 19 }}>
				<ScrollView
					style={{ width: "100%" }}
					contentContainerStyle={solicitudes.contentContainer}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={refreshRequests}
						/>
					}
				>
					{isSupervisor && (
						<View style={solicitudes.sectionContainer}>
							<View style={solicitudes.sectionTitleContainer}>
								<Text style={solicitudes.sectionTitle}>
									Solicitudes por aprobar
								</Text>
								<Text style={solicitudes.sectionSubtitle}>
									Solicitudes pendientes asignadas a ti como supervisor.
								</Text>
							</View>

							{isSupervisorLoading ? (
								<View style={solicitudes.loadingContainer}>
									<LoadingContent />
								</View>
							) : supervisorRequests.length > 0 ? (
								supervisorRequests.map((item) => (
									<RequestCard
										key={`supervisor-${item.id}`}
										item={item}
										showEmployeeName
										showSupervisorActions
										onApprove={openApproveModal}
										onReject={openRejectModal}
										isActionLoading={actionLoadingId === item.id}
									/>
								))
							) : (
								<EmptyState text="No tienes solicitudes pendientes por aprobar." />
							)}
						</View>
					)}

					<View style={solicitudes.sectionContainer}>
						<View style={solicitudes.sectionTitleContainer}>
							<Text style={solicitudes.sectionTitle}>Mis solicitudes</Text>
							<Text style={solicitudes.sectionSubtitle}>
								Solicita vacaciones o permisos y consulta el estado de tus
								solicitudes.
							</Text>
						</View>

						<View style={solicitudes.sectionButtonContainer}>
							<View style={solicitudes.buttonContainer}>
								<ButtonAction
									toggleModal={vacacionesModalHandler}
									icon="VACACIONES"
									size={25}
									fontSize={14}
									title="Solicitar vacaciones"
								/>
							</View>
							<View style={solicitudes.buttonContainer}>
								<ButtonAction
									toggleModal={permisosModalHandler}
									icon="VACACIONES"
									size={25}
									fontSize={14}
									title="Solicitar permiso"
								/>
							</View>
						</View>

						<View style={solicitudes.listHeaderContainer}>
							<Text style={solicitudes.listTitle}>Historial</Text>
						</View>

						{isEmployeeLoading ? (
							<View style={solicitudes.loadingContainer}>
								<LoadingContent />
							</View>
						) : employeeRequests.length > 0 ? (
							employeeRequests.map((item) => (
								<RequestCard
									key={`employee-${item.id}`}
									item={item}
									showEmployeeActions
									onCancel={openCancelModal}
									isActionLoading={actionLoadingId === item.id}
								/>
							))
						) : (
							<EmptyState text="No tienes solicitudes registradas." />
						)}
					</View>
				</ScrollView>
			</View>

			{isVacModalVisible && (
				<SolVacaciones
					onCallback={vacacionesModalHandler}
					onExit={closeVacacionesModal}
					isVacModalVisible={isVacModalVisible}
				/>
			)}

			{isPermModalVisible && (
				<SolPermisos
					onCallback={permisosModalHandler}
					onExit={closePermisosModal}
					isVacModalVisible={isPermModalVisible}
				/>
			)}

			<AbsenceCommentModal
				visible={commentModal.visible}
				title={commentModal.title}
				description={commentModal.description}
				confirmText={commentModal.confirmText}
				confirmColor={commentModal.confirmColor}
				requireComment={commentModal.requireComment}
				isSubmitting={actionLoadingId === commentModal.request?.id}
				onCancel={closeCommentModal}
				onConfirm={submitCommentModal}
			/>
		</View>
	);
}

export default Solicitudes;
