import {
	VoiceRecorder,
	GenericResponse,
	RecordingData,
} from "capacitor-voice-recorder";

export function usePauseRecording() {
	VoiceRecorder.pauseRecording()
		.then((result: GenericResponse) => console.log(result.value))
		.catch((error) => console.log(error));
}
export function useResumeRecording() {
	VoiceRecorder.resumeRecording()
		.then((result: GenericResponse) => console.log(result.value))
		.catch((error) => console.log(error));
}
export function playBase64(base64: string) {
	const mediaSource = new MediaSource();
	const audio: any = document.getElementById("audio-player");
	if (base64 === "") return;
	if (base64.includes("undefined")) return;
	fetch(base64)
		.then((response) => response.arrayBuffer())
		.then((buffer) => {
			audio.onloadedmetadata =
				audio.oncanplay =
				audio.onplay =
					(e: any) => console.log(e);
			audio.src = URL.createObjectURL(mediaSource);
			mediaSource.onsourceopen = async (_) => {
				URL.revokeObjectURL(audio.src);
				const source = mediaSource.addSourceBuffer("audio/webm;codecs=opus");
				source.onupdateend = (e) => console.log(e);
				source.appendBuffer(buffer);
			};
			audio.src = URL.createObjectURL(mediaSource);
		})
		.catch(console.error);
}
// cretae
export async function useStopRecording(callback: (result: any) => void) {
	VoiceRecorder.stopRecording()
		.then((result: RecordingData) => {
			callback(result);
		})
		.catch((err) => {
			callback(err);
		});
}
export function useCheckVoiceCapability() {
	VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) =>
		console.log(result.value)
	);
}
export function useRequestPermission() {
	VoiceRecorder.requestAudioRecordingPermission().then(
		(result: GenericResponse) => console.log(result.value)
	);
}
export function useCheckPermission() {
	VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) =>
		console.log(result.value)
	);
}
export function useStartRecording() {
	VoiceRecorder.startRecording()
		.then((result: GenericResponse) => console.log(result.value))
		.catch((error) => console.log(error));
}
