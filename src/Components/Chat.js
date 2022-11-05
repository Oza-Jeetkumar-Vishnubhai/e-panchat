import React, { useEffect, useState } from 'react'
import { name } from './Join'
import { io } from "socket.io-client"
import './CSS/chat.css'

var socket;

function Chat() {

    const [msg, setMsg] = useState([])

    const send = () => {
        var message = document.getElementById("message").value;
        socket.emit("send", { message, name })
        document.getElementById("message").value = "";
    }

    const left = () => {
        socket.emit("user_left", name)
    }

    // receiving response of server
    useEffect(() => {
        socket = io.connect("http://localhost:8000")
        socket.emit("user_joined", name)
        return () => {
            socket.off();
        }
    }, [])
    useEffect(() => {
        console.log("msg changed")
        socket.on("send", (data) => {
            console.log("send is called")
            setMsg([...msg, data])
        })
        socket.on("user_joined", (joinedString) => {
            setMsg([...msg, joinedString])
        })
        
        socket.on("user_left", (leftString,name) => {
            setMsg([...msg, leftString])
        })
        console.log(msg)
        return () => {
            socket.off();
        }
    }, [msg])
    return (
        <div>
            <div className="chat-box">
                {
                    msg.map((ele, ind) => {
                        if (ele?.name == undefined)
                            return <p key={ind} class="msg"><div>{ele}</div></p>
                        else
                            // return <p key={ind}><div className={ele.name === "You" ? "right chat" : "left chat"}><span style={{ "color": "white" }}>{ele.name}</span> <br /> {ele.message}</div></p>
                            return <p key={ind} className={ele.name === "You" ? "right chat" : "left chat"}><span style={{ "color": "white" }}>{ele.name}</span> <br /> {ele.message}</p>
                    })
                }
            </div>
            <div className="send">
                <button id="attachment">+</button>
                <textarea id="message" onKeyPress={(e) => { if (e.key === "Enter") send() }}/>
                <button onClick={send} id="send">send</button>
            </div>
        </div>
    )
}

export default Chat
