import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const FirebaseContext = createContext();
const firebaseConfig = {
  apiKey: "AIzaSyCKwpHQ-VIexYslRBoXgZDVkvlwc6kyoSs",
  authDomain: "fir-context-8f3fa.firebaseapp.com",
  projectId: "fir-context-8f3fa",
  storageBucket: "fir-context-8f3fa.appspot.com",
  messagingSenderId: "780282884784",
  appId: "1:780282884784:web:9eea544da38acb5e46c175",
  databaseURL : 'https://fir-context-8f3fa-default-rtdb.firebaseio.com',
};
const firebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(firebaseApp);
const FireStore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, (user) => {
        if (user) setUser(user);
        else setUser(null);
      });
    }, []);
  
    const isLoggedIn = user ? true : false;
  
    const signUpWithEmailandPassword = (email, password) => {
      return createUserWithEmailAndPassword(FirebaseAuth, email, password);
    };
  
    const loginWithEmailandPassword = (email, password) => {
      return signInWithEmailAndPassword(FirebaseAuth, email, password);
    };

    const logoutUser = () => {
        return signOut(FirebaseAuth);
    }

    const newSaveIt = async (title, description, publishDate, imageUrl, newsUrl, source) => {
      return await addDoc(collection(FireStore, "savedNews"), {
        title,
        description,
        publishDate,
        newsUrl,
        source,
        imageURL: imageUrl,
        userID: user.uid,
        userEmail: user.email,
      });
    }

    const findNews = async (newsUrl) => {
      const q = query(collection(FireStore, "savedNews") , where("newsUrl", "==", newsUrl));
      const querySort = await getDocs(q);
      if(!querySort.empty){
        const doc = querySort.docs[0];
        return doc;
      }
    }

    const deletenews = async (docID)=> {
      const docRef = doc(FireStore, "savedNews", docID);
      await deleteDoc(docRef);
    }

    const getAllSavedNews = async () => {
      if (!user) return [];
      const q = query(collection(FireStore, "savedNews"), where("userID", "==", user.uid));
      const querySnap = await getDocs(q);
      const newsList = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return newsList;
    }
    
    return(
        <FirebaseContext.Provider value={{signUpWithEmailandPassword, loginWithEmailandPassword, logoutUser, newSaveIt,findNews,deletenews,getAllSavedNews, isLoggedIn, user}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}