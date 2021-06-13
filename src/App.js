import React, { useState, useEffect } from 'react'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics';
import 'firebase/firestore'

import Button from './components/Button'
import Channel from './components/Channel'

const firebaseConfig = {
    apiKey: "AIzaSyB7cCC2dHmNX0T7dia_yObMycZZ_d-bdY8",
    authDomain: "react-fire-chat-e7117.firebaseapp.com",
    projectId: "react-fire-chat-e7117",
    storageBucket: "react-fire-chat-e7117.appspot.com",
    messagingSenderId: "250039619819",
    appId: "1:250039619819:web:58b852c2d353029cfdaeae",
    measurementId: "G-2N75N2PM03"
  }
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = firebase.auth()
const db = firebase.firestore()

function App() {
    const [user, setUser] = useState(() => auth.currentUser)
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                setUser(user)
            } else {
                setUser(null)
            }
            if(initializing) {
                setInitializing(false)
            }
        })

    return unsubscribe
    }, [])

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.useDeviceLanguage()
        try {
            await auth.signInWithPopup(provider)
        } catch (err) {
            console.log(err)
        }
    }

    const signOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (err) {
            console.log(err)
        }
    }

    if(initializing) return "Loading..."

  return (
      <div className="App">
        {user ? (
        <>
            <Button onClick={signOut}>Sign Out</Button>
            <p>{`Welcome to the chat, ${user.displayName}!`}</p>
            <Channel user={user} db={db} />
        </>
        ) : (
            <Button onClick={signInWithGoogle}>Sign In With Google</Button>
        )}
      </div>
  );
}

export default App;
