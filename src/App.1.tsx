import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { VoiceRecorder, GenericResponse } from "capacitor-voice-recorder";

export const App: React.FC = () => {
  // will print true / false based on the ability of the current device (or web browser) to record audio
  VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => console.log(result.value)
  );

  /**
   * will prompt the user to give the required permission, after that
   * the function will print true / false based on the user response
   */
  VoiceRecorder.requestAudioRecordingPermission().then(
    (result: GenericResponse) => console.log(result.value)
  );

  /**
   * will print true / false based on the status of the recording permission.
   * the promise will reject with "COULD_NOT_QUERY_PERMISSION_STATUS"
   * if the current device cannot query the current status of the recording permission
   */
  VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) => console.log(result.value)
  );

  /**
   * In case of success the promise will resolve to { value: true }
   * in case of an error the promise will reject with one of the following messages:
   * "MISSING_PERMISSION", "ALREADY_RECORDING", "MICROPHONE_BEING_USED", "DEVICE_CANNOT_VOICE_RECORD", or "FAILED_TO_RECORD"
   */
  VoiceRecorder.startRecording()
    .then((result: GenericResponse) => console.log(result.value))
    .catch((error) => console.log(error));

  /**
   * In case of success the promise will resolve to:
   * {"value": { recordDataBase64: string, msDuration: number, mimeType: string }},
   * the file will be in one of several possible formats (more on that later).
   * in case of an error the promise will reject with one of the following messages:
   * "RECORDING_HAS_NOT_STARTED" or "FAILED_TO_FETCH_RECORDING"
   */
  // VoiceRecorder.stopRecording()
  // 	.then((result: RecordingData) => console.log(result.value))
  // 	.catch((error) => console.log(error));
  /**
   * will pause an ongoing recording. note that if the recording has not started yet the promise
   * will reject with `RECORDING_HAS_NOT_STARTED`. in case of success the promise will resolve to `{ value: true }` if the pause
   * was successful or `{ value: false }` if the recording is already paused.
   * if the current mobile os does not support this method the promise will reject with `NOT_SUPPORTED_OS_VERSION`
   */
  // VoiceRecorder.pauseRecording()
  // 	.then((result: GenericResponse) => console.log(result.value))
  // 	.catch((error) => console.log(error));
  /**
   * will resume a paused recording. note that if the recording has not started yet the promise
   * will reject with `RECORDING_HAS_NOT_STARTED`. in case of success the promise will resolve to `{ value: true }` if the resume
   * was successful or `{ value: false }` if the recording is already running.
   * if the current mobile os does not support this method the promise will reject with `NOT_SUPPORTED_OS_VERSION`
   */
  // VoiceRecorder.resumeRecording()
  // 	.then((result: GenericResponse) => console.log(result.value))
  // 	.catch((error) => console.log(error));
  /**
   * Will return the current status of the plugin.
   * in this example one of these possible values will be printed: "NONE" / "RECORDING" / "PAUSED"
   */
  // VoiceRecorder.getCurrentStatus()
  // 	.then((result: CurrentRecordingStatus) => console.log(result.status))
  // 	.catch((error) => console.log(error));
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
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
