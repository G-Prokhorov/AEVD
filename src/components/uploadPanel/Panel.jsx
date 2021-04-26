import React from "react";
import "./style.css";
import Upload from "./Upload";

import moon from "../../img/moon2.png"

export default function UploadPanel() {
    return <main className="container panel">
        <Upload accept={".mp4 .wmv .flv .ogv"} />
        <div className="composition">
            <img src={moon} alt="" className="moon" />
            <div className="video" />
        </div>
        <div className="button">
            <button className="submitBth border animation1">Submit</button>
        </div>

    </main>
}