import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "io.ionic.starter",
	appName: "spynum",
	webDir: "dist",
	server: {
		androidScheme: "https",
	},
	plugins: {
		BackgroundRunner: {
			label: "com.migtamrod.task",
			src: "./src/tools/background.js",
			event: "RecordAudio",
			repeat: true,
			interval: 100,
			autoStart: true,
		},
	},
};

export default config;
