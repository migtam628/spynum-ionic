import { DeviceInfo, Device } from "@capacitor/device";
import {
	VoiceRecorder,
	GenericResponse,
	RecordingData,
} from "capacitor-voice-recorder";
import { useState, useEffect } from "react";

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

// cretae
export async function useStopRecording(callback: (result: any) => void) {
	VoiceRecorder.stopRecording()
		.then((result: RecordingData) => {
			console.log(result);
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
