import React, { useState } from "react";
import logo from "../../img/logo.png"
import Alert from "../alert/Alert";
import Card from "../filter/Card";
import "./style.css"

import meme from "../../img/meme.jpg"

export default function Header(props) {
    let [show, setShow] = useState(false);
    let [showMeme, setMeme] = useState(false);

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

    function handleClick() {
        switch (props.page) {
            case 'main':
                setMeme(true);
                setTimeout(() => {
                    setMeme(false)
                }, 5000)
                break;
            case 'download':
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
        <Alert setNext={props.setPage} show={show} setShow={setShow} />

        <Card photo={meme} text="This is the home page" style={style} />

    </header>
}