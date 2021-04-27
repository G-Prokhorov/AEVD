import react from "react";

import "./style.css";

export default function intervalPanel(props) {
    return <div className="container intervalPanel">
        <div id="musicInterval" className="border"></div>
        <div className="controlPanel">
            <button className="submitBth border animation1"></button>
            <button className="submitBth border animation1"></button>
        </div>
    </div >
}