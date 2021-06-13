import React, { useState, useEffect } from 'react'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics';
import 'firebase/firestore'
import styled from 'styled-components'

import Button from './components/Button'
import { AiOutlineGoogle } from 'react-icons/ai'
import Channel from './components/Channel'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;
    color: whitesmoke;
    padding: 1rem;
    padding-bottom: 0;
    background: #e96443;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #904e95, #e96443);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #904e95, #e96443); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const WelcomeMsg = styled.p`

`



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
      <Container>
        {user ? (
        <>
            <Button onClick={signOut}>Sign Out</Button>
            <p>{`Welcome to the chat, ${user.displayName}!`}</p>
            <Channel user={user} db={db} />
        </>
        ) : (
            <Button onClick={signInWithGoogle}><AiOutlineGoogle /> Sign In With Google</Button>
        )}
      </Container>
  );
}

export default App;
