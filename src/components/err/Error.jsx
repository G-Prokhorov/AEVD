import react from "react";

import "./style.css";

export default function Error(props) {
    return <div className="errDiv" style={
        props.action ? { bottom: "40px" } : { bottom: "-100px" }
    }>
        <h3>Attation, please</h3>
        <p>{props.text}</p>
    </div >

}