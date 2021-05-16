import React, { useState } from "react";
import logo from "../../img/logo.png"
import Alert from "../alert/Alert";
import Card from "../filter/Card";
import "./style.css"

import meme from "../../img/meme.jpg"

export default function Header(props) {
    let [show, setShow] = useState(false);
    let [showMeme, setMeme] = useState(false);
    let [backState, setBack] = useState(false)

    let style = {
        transition: "0.5s",
        zIndex: "10000",
        position: "fixed",
        left: "0",
        right: "0",
        margin: "0 auto",
        fontSize: "16px",
        top: showMeme ? "10px" : "-300px",
        height: "270px",
    }

    function back() {
        props.stop();
        switch (props.page) {
            case 'main':
                setMeme(true);
                setTimeout(() => {
                    setMeme(false)
                }, 5000)
                break;
            case 'music':
                props.setPage('main');
                break;
            case 'interval':
                props.setPage('music');
                break;
            case 'filter':
                props.setPage('interval');
                break;
            case 'download':
                setBack(true);
                setShow(true);
                break;
            default:
        }
    }

    function handleClick() {
        switch (props.page) {
            case 'main':
                setMeme(true);
                setTimeout(() => {
                    setMeme(false)
                }, 5000)
                break;
            case 'download':
                setBack(false);
                setShow(true);
                break;
            default:
                props.stop();
                props.setPage('main');
                break;
        }
    }

    return <header>
        <img onClick={handleClick} src={logo} className="logo" alt="AEVD" />
        <Alert setNext={props.setPage} back={backState} show={show} setShow={setShow} />

        <svg onClick={back} xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#6328b8"
             className="back" viewBox="0 0 16 16">
            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
        </svg>

        <Card photo={meme} text="This is the home page" style={style} />

    </header>
}