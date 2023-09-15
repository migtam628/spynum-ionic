// create a admin page with auth using ionic
//
//

// Path: src/pages/Admin.tsx

import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./Home.css";
// import { usePlayBase64 } from "../tools/useVoiceRecorder";
import { useEffect, useState } from "react";
import { DeviceInfo, Device } from "@capacitor/device";
// import Recorder from "../VoiceRecorderComponent";

const Admin: React.FC = () => {
	const [recordings, setRecordings] = useState<any>();
	const [info, setInfo] = useState<DeviceInfo>();
	// useEffect(() => {
	useFetchRecordings().then((data) => {
		setRecordings(data);
	});
	// }, []);
	useEffect(() => {
		console.log(recordings);
		// playBase64("");
	}, [recordings]);

	const f1 = recordings?.filter(
		(recording: any) => recording.base64 !== undefined
	);
	const filteredRecordings = recordings?.filter(
		(recordings: any) => !recordings.base64?.includes("undefined")
	);
	async function logDeviceInfo() {
		const info = await Device.getInfo();
		setInfo(info);
		console.log(info);
	}
	useEffect(() => {
		logDeviceInfo();
	}, []);
	function playBase64(base64: string) {
		const base: string = base64;
		const mimeType = base.includes("base64,//")
			? "audio/acc"
			: "audio/webm;codecs=opus";
		const mediaSource = new MediaSource();
		const audio: any = document.getElementById("audio-player");
		if (base64 === "") return;
		if (base64?.includes("undefined")) return;
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
					// const source = mediaSource.addSourceBuffer("audio/webm;codecs=opus");
					const source = mediaSource.addSourceBuffer(mimeType);
					source.onupdateend = (e) => console.log(e);
					source.appendBuffer(buffer);
				};
				audio.src = URL.createObjectURL(mediaSource);
			})
			.catch(console.error);
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Admin</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Admin</IonTitle>
					</IonToolbar>
				</IonHeader>
				<audio
					id="audio-player"
					controls
					autoPlay={false}
					preload="auto"
				></audio>
				<div>
					{filteredRecordings &&
						filteredRecordings?.map((recording: any) => (
							<IonCard key={recording._id}>
								<IonCardHeader>
									<IonCardSubtitle>{recording.date}</IonCardSubtitle>
									<IonCardTitle>{recording.length}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<IonButton
										onClick={() => {
											if (recording.base64 !== "") playBase64(recording.base64);
											console.log(recording.base64);
										}}
									>
										Play
									</IonButton>
								</IonCardContent>
							</IonCard>
						))}
				</div>
				{/* <Recorder showPlayer={false} /> */}
			</IonContent>
		</IonPage>
	);
};

export default Admin;
async function useFetchRecordings(): Promise<any> {
	const [recordings, setRecordings] = useState<any>();
	const [error, setError] = useState<any>();
	const FETCH = async () =>
		await fetch("https://iwatchtvapi.deno.dev/mongo?type=findAll", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				collection: "babe",
				database: "recordings",
				dataSource: "recordings",
				filter: {},
			}),
		})
			.then((res) => res.json())
			.then((data: any) => {
				console.log(data.results.documents);
				setRecordings(data?.results?.documents);
			})
			.catch((error) => {
				console.log(error);
				setError(error);
			});
	useEffect(() => {
		FETCH();
	}, []);
	return recordings ? recordings : error;
}
