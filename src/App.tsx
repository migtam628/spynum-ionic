import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { App as Application } from "@capacitor/app";
import {
	VoiceRecorder,
	VoiceRecorderPlugin,
	RecordingData,
	GenericResponse,
	CurrentRecordingStatus,
} from "capacitor-voice-recorder";

Application.addListener("appStateChange", ({ isActive }) => {
	console.log("App state changed. Is active?", isActive);
});

Application.addListener("appUrlOpen", (data) => {
	console.log("App opened with URL:", data);
});

Application.addListener("appRestoredResult", (data) => {
	console.log("Restored state:", data);
});

const checkAppLaunchUrl = async () => {
	const { url }: any = await Application.getLaunchUrl();

	console.log("App opened with URL: " + url);
};
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Recorder from "./VoiceRecorderComponent";
import Admin from "./pages/Admin";

setupIonicReact();

const App: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route exact path="/home">
						<Home />
					</Route>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
					<Route exact path="/admin">
						<Admin />
					</Route>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
