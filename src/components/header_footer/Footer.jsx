import React from "react";
import "./style.css"

import instagram from "../../img/icon/instagram.svg"
import twitter from "../../img/icon/twitter.svg"
import linkedin from "../../img/icon/linkedin.svg"
import telegram from "../../img/icon/telegram.svg"

export default function Footer() {
    return <footer>
        <nav className="childFoo icons">
            <a href="https://www.instagram.com/g_prkhrv/"><img className="icons" src={instagram} alt="" /></a>
            <a href="https://twitter.com/GPrkhrv?s=09" ><img className="icons" src={twitter} alt="" /></a>
            <a href="https://www.linkedin.com/in/gregory-prokhorov-595302201/"><img className="icons" src={linkedin} alt="" /></a>
            <a href="https://t.me/grisha_prokhorov"><img className="icons" src={telegram} alt="" /></a>
        </nav>
        <div className="childFoo childFooName">
            <p className="name">Prkhrv</p>
        </div>
        <div className="childFoo">
            <span>#AEVD</span>
            <a href="/">Donation</a>
        </div>
    </footer>

}