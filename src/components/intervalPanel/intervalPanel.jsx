import react from "react";

import "./style.css";

export default function intervalPanel(props) {
    function handleClick(event) {
        console.log(event.nativeEvent.offsetX);
    }

    return <div className="container intervalPanel">
        <div onClick={handleClick} id="musicInterval" className="border"></div>
        <div className="controlPanel">
            <button className="submitBth border animation1"></button>
            <button className="submitBth border animation1"></button>
        </div>
    </div >
}