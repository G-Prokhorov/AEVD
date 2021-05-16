import React from "react";

import "./style.css"

export default function Card(props) {
    return <div key={props.key} id={props.text} onClick={props.onClick} className="card" style={props.style}>
        <img src={props.photo} alt="" />
        <h3>{props.text}</h3>
    </div>
}