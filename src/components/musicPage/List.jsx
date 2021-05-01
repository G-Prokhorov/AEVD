import React from "react"

import Wire from "./wire"

export default function List() {
    let create = () => {
        let table = [];
        for (let i = 0; i < 10; i++) {
            table.push(<div key={i} className="element border"></div>)
        }

        return table;
    }

    return <div className="listDiv">
        <div className="list">
            {create()}
        </div>
        <Wire />
    </div>

}