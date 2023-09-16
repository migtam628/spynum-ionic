import "./Home.css";
import Recorder from "../components/VoiceRecorderComponent";
import Page from "../components/Page";
import { IonButton, IonCard } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { delay } from "../tools/tools";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

const Home: React.FC<{}> = ({}) => {
	// const [isRecording, setIsRecording] = useState<any>(false);
	// const [blobURL, setBlobURL] = useState<any>("");
	// const [isBlocked, setIsBlocked] = useState<any>(false);
	// const [type, setType] = useState<any>("video");
	// const [mute, setMute] = useState<any>(true);
	// const [response, setResponse] = useState<RESPONSE | null | undefined>();
	const [phoneNumber, setPhoneNumber] = useState("");
	// const [id, setId] = useState<any>("");
	const [user, setUser] = useState<RESPONSE>();
	// const [token, setToken] = useState<any>(null);

	const [speechSaid, setSpeechSaid] = useState<any>("");

	useEffect(() => {
		SpeechRecognition.requestPermissions();
		SpeechRecognition.available().then((result) => console.log(result));
	}, []);

	function handleSpeech() {
		SpeechRecognition.start({
			language: "en-US",
			maxResults: 2,
			prompt: "Say something",
			partialResults: true,
			popup: true,
		}).then((result) => console.log(result));
	}

	function handleStopSpeech() {
		SpeechRecognition.stop().then((result) => console.log(result));
	}

	useEffect(() => {
		// listen to partial results
		SpeechRecognition.addListener("partialResults", (data: any) => {
			setSpeechSaid(data.value[0]);
		});
	}, []);

	useEffect(() => {
		console.log(speechSaid);
	}, [speechSaid]);

	const searchOptions: {
		url: RequestInfo | URL;
		init: RequestInit | undefined;
	} = {
		url:
			"https://zylalabs.com/api/2192/reverse+phone+lookup+api/2017/get+data?phone=" +
			phoneNumber,
		init: {
			headers: {
				// Authorization: "Bearer 2109|WPTZXEwyyPoqvc5iin6ms8ItbCCpbCFxEikrUZlR",
				Authorization: "Bearer 2158|5FpmWvjE8u3JAU5bwWzkLmi00kjio0rFNCigZEPO",
			},
		},
	};
	async function handleClick() {
		const info = await readFromLocalStorage("+1" + phoneNumber);
		console.log(info);
		delay(400);
		if (info) setUser(info);
		else if (phoneNumber) {
			// use fetch
			fetch(searchOptions.url, searchOptions.init)
				.then((r) => r.json())
				.then((res: RESPONSE) => {
					console.log(res);
					setUser(res);
					writeToLocalStorage(res?.phone_number, res);
				})
				.catch((err) => console.log(err));
		}
	}

	// create a component similar to the code above using Ionic COmponents
	const DisplayData: FC<{ user: any }> = ({ user }) => {
		return (
			<IonCard>
				<div className="content">
					{user && (
						<div>
							<p>
								<b>First Name:</b> {user.belongs_to?.firstname}
							</p>
							<p>
								<b>Last Name:</b> {user.belongs_to?.lastname}
							</p>
							<p>
								<b>Age:</b> {user.belongs_to?.age_range}
							</p>
							<p>
								<b>Phone Number:</b> {user?.phone_number}
							</p>
							<p>
								<b>Carrier:</b> {user?.carrier}
							</p>{" "}
							<p>
								<b>Valid Phone: </b> {user?.is_valid}
							</p>
							<p>
								<b>Line Type:</b> {user?.line_type}
							</p>
							<p>
								<b>Location:</b> {user.current_addresses[0]?.city}
							</p>
							<p>
								<b>Prepaid:</b> {user?.is_prepaid === true ? "Yes" : "No"}
							</p>
							<p>
								<b>Address:</b> {user?.current_addresses[0]?.street_line_1}
							</p>
							<p>
								<b>City:</b> {user?.current_addresses[0]?.city}
							</p>
							<p>
								<b>State:</b> {user?.current_addresses[0]?.state_code}
							</p>
							<p>
								<b>Zip Code:</b> {user?.current_addresses[0]?.postal_code}
							</p>
							<p>
								<b>Related Person:</b> {user.associated_people[0]?.name}
							</p>
							<p>
								<b>Relationship: </b> {user.associated_people[0]?.relation}
							</p>
						</div>
					)}
				</div>
			</IonCard>
		);
	};

	return (
		<Page title="Home">
			<Recorder showPlayer={false} />
			<IonCard className="centered-div">
				<div className="content">
					<h2>NEW SEARCH</h2>
					<label>Enter Phone #:</label>
					<input
						type="tel"
						id="text-input"
						name="text-input"
						onChange={(e) => {
							setPhoneNumber(e.target.value);
						}}
						defaultValue={phoneNumber}
					/>
					<button onClick={handleClick} type="submit">
						Search
					</button>
					<button onClick={handleSpeech} onDoubleClick={handleStopSpeech}>
						Speak
					</button>
					<div className="divider"></div>
				</div>
			</IonCard>
			<DisplayData user={user} />
		</Page>
	);
};

export default Home;

function writeToLocalStorage(key: any, value: any) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch (error) {
		console.error("Error writing to localStorage:", error);
		return false;
	}
}

async function readFromLocalStorage(key: any) {
	try {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : null;
	} catch (error) {
		console.error("Error reading from localStorage:", error);
		return null;
	}
}
