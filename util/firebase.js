import * as admin from "firebase-admin";

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
			privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
			clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
		}),
		databaseURL: "",
	});
}

export const firestore = admin.firestore();
