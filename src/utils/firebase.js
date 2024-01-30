import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "technext-blog-a7da2.firebaseapp.com",
  projectId: "technext-blog-a7da2",
  storageBucket: "technext-blog-a7da2.appspot.com",
  messagingSenderId: "672021553090",
  appId: "1:672021553090:web:4cf69aae61d6065eef405b",
  measurementId: "G-YHT5JTV9N0"
};


const app = initializeApp(firebaseConfig);
export {app};
// const analytics = getAnalytics(app);