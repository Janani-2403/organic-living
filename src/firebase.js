import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChDJv-5X-ocau2QaBDjZ1GPnot1FfaRso",
  authDomain: "organic-living-a70de.firebaseapp.com",
  projectId: "organic-living-a70de",
  storageBucket: "organic-living-a70de.firebasestorage.app",
  messagingSenderId: "410277468837",
  appId: "1:410277468837:web:e1e4e224d5cf9f47058b4c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);