import React from 'react'
import {Link} from "react-router-dom"
var name;
function Join() {
    const join_user = () => {
        name = document.getElementById("name").value;
        console.log(name)
    }
    return (
        <div className="App">
                Enter your name : <input type="text" id="name" /><br />
                <Link to="/chat" onClick={join_user}><button>Join</button></Link>
        </div>
    );
}

export default Join
export {name}
