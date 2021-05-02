import React from "react";

import photo from "../../img/d883f356f66173c404b5998ff70ea94a.jpg"
import Card from "./Card";
import "./style.css";

export default function FilterPage(props) {
    return <div className="filterPage container">
        <div className="preview">
            <img src={photo} alt="" />
        </div>
        <div className="filterList">
            {[1, 2, 3, 4].map(() => {
                return <Card photo={photo} text={"lol"} />
            })}
        </div>
    </div>
}