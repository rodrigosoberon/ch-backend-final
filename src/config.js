//DB global variable (mongoDB or firestore)
export const DB_ENGINE = 'mongoDB'

//Config Mongo DB
export const mongo_url = 'mongodb+srv://rsoberon:contigo$1mac@cluster0.dola79s.mongodb.net/?retryWrites=true&w=majority'
// const mongo_url = 'mongodb://localhost:27017/ecommerce'
export const base = 'ecommerce'


//Config Firestore
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAMkdwFahfPwtthWj-LRJNkBjWoeI3Cci0",
    authDomain: "ch-final-ecommerce-28f99.firebaseapp.com",
    projectId: "ch-final-ecommerce-28f99",
    storageBucket: "ch-final-ecommerce-28f99.appspot.com",
    messagingSenderId: "1015869050852",
    appId: "1:1015869050852:web:cc72663d273e05d3d141f1"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)