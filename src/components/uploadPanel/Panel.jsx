import React from "react";
import "./style.css";
import Upload from "./Upload";
import ErrorDiv from "../err/Error";

import moon from "../../img/moon2.png";
import Wire from "../svgComp/wire";
import Statellite from "../svgComp/statellite";

export default function UploadPanel(props) {
    return <>
        <main className="container panel">
            <Upload accept={".mp4, .mkv, .webm"} multiple={true} state={props.state} />
            <div className="composition">
                <img src={moon} alt="" className="moon" />
                <div className="video" />
            </div>
            <div className="button">
                <button onClick={() => { props.setPage('music') }} className="submitBth border animation1" disabled={props.block}>Submit</button>
            </div>



        </main>
        <ErrorDiv text="You could upload file" action={props.err} />
        <Wire classname={"wireMain"} />
        <Statellite />
    </>
}