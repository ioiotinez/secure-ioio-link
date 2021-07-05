import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_apiKey,
	authDomain: process.env.NEXT_PUBLIC_authDomain,
	projectId: process.env.NEXT_PUBLIC_projectId,
	storageBucket: process.env.NEXT_PUBLIC_storageBucket,
	messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
	appId: process.env.NEXT_PUBLIC_appId,
	measurementId: process.env.NEXT_PUBLIC_measurementId,
	appName: process.env.NEXT_PUBLIC_appName,
};

console.log(firebaseConfig);

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();

export const addLinkToCollection = (link) => {
	db.collection("links")
		.add({
			message: link.message,
			code: link.code,
			createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
			entireLink: link.entireLink,
		})
		.then((docRef) => {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
};
