import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { getStorage } from 'firebase/storage';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import config, { service_account_config } from './config';



const Firebase = firebase.initializeApp(config.firebase);

// Add or Remove authentification methods here.
export const Providers = {
    google: new firebase.auth.GoogleAuthProvider(),
    facebook: new firebase.auth.FacebookAuthProvider(),
};



/* var serviceAccount = service_account_config;

 initializeApp({
  credential: credential.cert("firebase-adminsdk-zilnv@my-project-1538048980189.iam.gserviceaccount.com")
}); */

export const auth = firebase.auth();
export const storage = Firebase.storage('gs://my-project-1538048980189.appspot.com')
export const db = firebase.firestore()
export default Firebase;