import React from "react"

import Wire from "../svgComp/wire"

export default function List(props) {
    let smile = {
        "cool": "😎",
        "sad": "😥",
    }

    return <div className="listDiv">
        <div className="list">
            {props.musicList.map((elemt, key) => {
                return <div id={elemt.path} onClick={props.onClick} key={key} className="element">
                    <h3>{elemt.title}</h3>
                    <p>{elemt.artist}</p>
                    <span>{smile[elemt.smile]}</span>
                </div>
            })}
        </div>
        <Wire />
    </div>

}