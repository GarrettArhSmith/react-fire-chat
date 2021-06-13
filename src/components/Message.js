import React from 'react';
import { formatRelative } from 'date-fns'

function Message(props) {
    const { id, text, createdAt, displayName, photoURL, uid } = props

    let timeStamp = "loading..."
    if(createdAt) {
        timeStamp = formatRelative(new Date(createdAt?.seconds * 1000), new Date())
    }

    return (
        <li className="message">
            <img src={photoURL} className="profileImg"/>
            <p className="messageText">{text}</p>
            <p className="messageInfo">
                {displayName} • 
                <span className="timeStamp"> {timeStamp}</span>
            </p>
        </li>
    )
}

export default Message