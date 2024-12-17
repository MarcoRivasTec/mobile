declare module "react-native-open-file" {
	export function openDoc(
		files: { url: string; fileName?: string; fileType?: string }[],
		callback: (error: any, result: any) => void
	): void;

	const OpenFile: {
		openDoc: typeof openDoc;
	};

	export default OpenFile;
}
