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
import { playBase64 } from "../useVoiceRecorder";
import { useEffect, useState } from "react";
// import Recorder from "../VoiceRecorderComponent";

const Admin: React.FC = () => {
	const [recordings, setRecordings] = useState<any>();
	// useEffect(() => {
	useFetchRecordings().then((data) => {
		setRecordings(data);
	});
	// }, []);
	useEffect(() => {
		console.log(recordings);
        playBase64("");
	}, [recordings]);

	const f1 = recordings?.filter(
		(recording: any) => recording.base64 !== undefined
	);
	const filteredRecordings = recordings?.filter((recordings: any) =>
		!recordings.base64.includes("undefined")
	);
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
                                            console.log(recording.base64)
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
