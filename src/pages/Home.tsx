import "./Home.css";
import Recorder from "../components/VoiceRecorderComponent";
import Page from "../components/Page";
import { IonCard } from "@ionic/react";
import { useState } from "react";
import { delay } from "../tools/tools";

const Home: React.FC<{}> = ({}) => {
	const [isRecording, setIsRecording] = useState<any>(false);
	const [blobURL, setBlobURL] = useState<any>("");
	const [isBlocked, setIsBlocked] = useState<any>(false);
	const [type, setType] = useState<any>("video");
	const [mute, setMute] = useState<any>(true);
	const [response, setResponse] = useState<RESPONSE | null | undefined>();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [id, setId] = useState<any>("");
	const [user, setUser] = useState<RESPONSE>();
	const [token, setToken] = useState<any>(null);

	const searchOptions: {
		url: RequestInfo | URL;
		init: RequestInit | undefined;
	} = {
		url:
			"https://zylalabs.com/api/2192/reverse+phone+lookup+api/2017/get+data?phone=" +
			phoneNumber,
		init: {
			headers: {
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


	const PhoneNumberform = () => {
		return (
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
					<div className="divider"></div>
				</div>
			</IonCard>
		);
	};
	// create a component similar to the code above using Ionic COmponents
	const DisplayData = () => {
		return (
			<IonCard>
				
			</IonCard>
		);
	};

	return (
		<Page title="Home">
			<Recorder time={30} showPlayer={false} />
			<PhoneNumberform />
			<DisplayData />
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
