import React from "react";

import "./style.css"

export default function Card(props) {
    return <div className="card" style={props.style}>
        <img src={props.photo} alt=""></img>
        <h3>{props.text}</h3>
    </div>
}