import React from 'react';
import { formatRelative } from 'date-fns'
import styled from 'styled-components'

const Card = styled.li`
    display: grid;
    grid-template-columns: 70px 1fr;
    grid-template-rows: 2fr 1fr;
    align-items: center;
    text-align: left;
    padding: 1rem 2rem;
    border-radius: 1rem;
    background-image: linear-gradient(to top, hsla(203, 20%, 84%, 0.6) 0%, hsla(201, 32%, 91%, 0.7) 100%);
`

const ProfilePic = styled.img`
    width: 4rem;
    grid-row: 1 / 3;
    border-radius: 1rem;
    margin-right: 2rem;
    justify-self: center;
`

const Text = styled.p`
    word-break: break-word;
    color: hsl(296, 30%, 20%);
`

const Info = styled.p`
    grid-row: 2 / 3;
    font-size: 0.7em;
    color: hsl(296, 30%, 35%);
    margin: 0;
`

const TimeStamp = styled.span`
    text-transform: capitalize;
`

function Message(props) {
    const { id, text, createdAt, displayName, photoURL, uid } = props

    let timeStamp = "loading..."
    if(createdAt) {
        timeStamp = formatRelative(new Date(createdAt?.seconds * 1000), new Date())
    }

    return (
        <Card>
            <ProfilePic src={photoURL} />
            <Text>{text}</Text>
            <Info>
                {displayName} • 
                <TimeStamp> {timeStamp}</TimeStamp>
            </Info>
        </Card>
    )
}

export default Message