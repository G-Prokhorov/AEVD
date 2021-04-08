import React from "react";
import logo from "../../img/logo.png"
import "./style.css"

export default function Header() {
    return <header>
        <img src={logo} className="logo" alt="AEVD" />
    </header>
}