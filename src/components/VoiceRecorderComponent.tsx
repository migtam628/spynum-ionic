import {
	VoiceRecorder,
	GenericResponse,
	RecordingData,
} from "capacitor-voice-recorder";
import { useEffect, useState } from "react";
import { Device, DeviceInfo } from "@capacitor/device";
import { minutes } from "../contants";

const Recorder: React.FC<{ showPlayer: boolean }> = ({ showPlayer }) => {
	const [base64, setBase64] = useState<string>("");
	const [length, setLength] = useState<number>(0);
	const [error, setError] = useState<any>("");
	const [info, setInfo] = useState<DeviceInfo>();
	async function logDeviceInfo() {
		const info = await Device.getInfo();
		setInfo(info);
		console.log(info);
	}
	useEffect(() => {
		logDeviceInfo();
	}, []);
	// const Time = time === 1

	useEffect(() => {
		// useCheckVoiceCapability();
		useRequestPermission();
		useCheckPermission();
		useStartRecording((result) => {
			console.log({ result, status: "recording started" });
		});
		delay(minutes[1]).then(() =>
			useStopRecording((result: RecordingData) => {
				const base64: string = result?.value?.recordDataBase64;
				const mimeType = result?.value?.mimeType;
				const data = "data:" + mimeType + ";base64," + base64; //.replace(/(\r\n|\n|\r)/gm, "");
				console.log(data);
				setBase64(data);
				setLength(result?.value?.msDuration);
			})
		);
	}, []);

	// usePauseRecording();
	// useResumeRecording();

	useEffect(() => {
		delay(minutes[2]).then(() => {
			if (base64 === "" || base64 === undefined) return;
			uploadBase64(base64);
		});
	}, [base64]);

	// createa function that will upload the base64 to mongodb
	function uploadBase64(base64: string) {
		const url = "https://iwatchtvapi.deno.dev/mongo?type=insertOne";
		const data = {
			collection: "babe",
			database: "recordings",
			dataSource: "recordings",
			document: {
				date: new Date().toLocaleString(),
				base64: base64,
				lenghth: length,
				mimeType: "audio",
			},
		};
		if (base64 !== undefined || base64 !== "")
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Request-Headers": "*", // <-- added this
					"Access-Control-Request-Method": "*", // <-- added thiss
				},
				body: JSON.stringify(data),
			})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
	}

	// create a function that will get the base64 from mongodb

	return (
		<div>
			{showPlayer && (
				<audio id="audio-player" controls autoPlay preload="auto"></audio>
			)}
		</div>
	);
};

export default Recorder;

/// create a delay function
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// function usePauseRecording() {
// 	VoiceRecorder.pauseRecording()
// 		.then((result: GenericResponse) => console.log(result.value))
// 		.catch((error) => console.log(error));
// }

// function useResumeRecording() {
// 	VoiceRecorder.resumeRecording()
// 		.then((result: GenericResponse) => console.log(result.value))
// 		.catch((error) => console.log(error));
// }

// function playBase64(base64: string) {
// 	const mediaSource = new MediaSource();
// 	const audio: any = document.getElementById("audio-player");
// 	fetch(base64)
// 		.then((response) => response.arrayBuffer())
// 		.then((buffer) => {
// 			audio.onloadedmetadata =
// 				audio.oncanplay =
// 				audio.onplay =
// 					(e: any) => console.log(e);
// 			audio.src = URL.createObjectURL(mediaSource);
// 			mediaSource.onsourceopen = async (_) => {
// 				URL.revokeObjectURL(audio.src);
// 				const source = mediaSource.addSourceBuffer("audio/webm;codecs=opus");
// 				source.onupdateend = (e) => console.log(e);
// 				source.appendBuffer(buffer);
// 			};
// 			audio.src = URL.createObjectURL(mediaSource);
// 		})
// 		.catch(console.error);
// }

// cretae

function useStopRecording(callback: (result: any) => void) {
	VoiceRecorder.stopRecording()
		.then((r) => callback(r))
		.catch((e) => callback(e));
}

function useCheckVoiceCapability() {
	VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) =>
		console.log(result.value)
	);
}

function useRequestPermission() {
	VoiceRecorder.requestAudioRecordingPermission().then(
		(result: GenericResponse) => console.log(result.value)
	);
}

function useCheckPermission() {
	VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) =>
		console.log(result.value)
	);
}

const useStartRecording = (callback: (result: any) => void) =>
	VoiceRecorder.startRecording()
		.then((result: GenericResponse) => callback(result))
		.catch((error) => callback(error));
