import React from "react";
import logo from "../../img/logo.png"
import "./style.css"

export default function Header(props) {
    return <header>
        <img onClick={() => { props.setPage('main'); props.stop() }} src={logo} className="logo" alt="AEVD" />
    </header>
}