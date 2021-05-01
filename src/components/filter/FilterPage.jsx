import React from "react";

import photo from "../../img/d883f356f66173c404b5998ff70ea94a.jpg"
import "./style.css";

export default function FilterPage(props) {
    return <div className="filterPage container">
        <div className="preview">
            <img src={photo} alt="" />
        </div>
        <div className="filterList">
            {[1, 2, 3, 4].map(() => {
                return <div className="card">
                    <img src={photo} alt=""></img>
                    <h3>Lol</h3>
                </div>
            })}
        </div>
    </div>
}