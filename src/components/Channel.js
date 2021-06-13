import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import styled from 'styled-components'

import Message from './Message'


const MessageForm = styled.form`
    position: sticky;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr;
    width: 100vw;
    align-items: center;
    justify-content: center;
    height: 100px;
    background-image: linear-gradient(to top, hsla(203, 20%, 84%, 0.8) 0%, hsla(201, 32%, 91%, 0.9) 100%);
    padding: 0 2rem;
`

const Input = styled.input`
    height: 2.5rem;
    background: linear-gradient(to top, hsla(203, 20%, 90%, 0.5) 0%, hsla(201, 32%, 98%, 0.6) 100%);
    border: none;
    border-radius: 100px;
    font-size: 1.5em;
    padding: 0 1rem;
    outline: none;
    color: hsl(296, 30%, 30%);
`



function Channel({ user = null, db = null }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const { uid, displayName, photoURL } = user

    useEffect(() => {
        if(db) {
            const unsubscribe = db.collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                    setMessages(data)
                })
            return unsubscribe
        }
    }, [db])

    function handleChange(e) {
        setNewMessage(e.target.value)
    }
    
    function handleSubmit(e) {
        e.preventDefault()

        if(db) {
            db.collection('messages')
            .add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
            setNewMessage("")
        }
    }

    return (
        <>
        <ul className="list">
            {[...messages].reverse().map(message => (
                <Message key={message.id} {...message} />
            ))}
        </ul>
        <MessageForm onSubmit={handleSubmit}>
            <Input 
                type="text"
                value={newMessage}
                onChange={handleChange}
                placeholder="Type your message..."
            />
        </MessageForm>
        </>
    )
}

export default Channel;