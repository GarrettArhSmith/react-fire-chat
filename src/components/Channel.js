import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'

import Message from './Message'

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
        <form onSubmit={handleSubmit} className="messageForm">
            <input 
                type="text"
                value={newMessage}
                onChange={handleChange}
                placeholder="Type your message..."
            />
        </form>
        </>
    )
}

export default Channel;