import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDtCb0m70cPY3qwtpFZ3qpmL4Pymg5HAHI",
  authDomain: "programared-afa1e.firebaseapp.com",
  projectId: "programared-afa1e",
  storageBucket: "programared-afa1e.appspot.com",
  messagingSenderId: "624543459844",
  appId: "1:624543459844:web:a7a1b27b623678e2e4a351",
  measurementId: "G-B1KV9MT9CH",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const uploadFile = async (file, route) => {
  const storageRef = ref(storage, `${route}${v4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
