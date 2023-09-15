import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
// import "./Home.css";

const Page: React.FC<{ children?: any; title?: string }> = ({ children, title }) => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{title}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">{title}</IonTitle>
					</IonToolbar>
				</IonHeader>
				{children}
			</IonContent>
		</IonPage>
	);
};

export default Page;
