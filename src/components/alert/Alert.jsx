import React from "react";

export default function Alert(props) {
    function handleClick() {
        props.setShow(false)
    }
    return <div className="alertDiv styleMsg" style={{ top: props.show ? "10px" : "-200px" }}>
        <h3>Progress can be lost, are you sure?</h3>
        <button className="submitBth border choice yep" onClick={() => { handleClick(); props.back ? props.setNext("filter") : props.setNext("main")}}>Yep!</button>
        <button className="submitBth border choice no" onClick={handleClick}>No</button>
    </div >
}