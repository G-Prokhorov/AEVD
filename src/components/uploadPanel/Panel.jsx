import React from "react";
import "./style.css";
import Upload from "./Upload";
import ErrorDiv from "../alert/Error";

import moon from "../../img/moon2.png";
import Statellite from "../svgComp/statellite";

export default function UploadPanel(props) {
    return <>
        <main className="container panel">
            <Upload accept={".mp4, .mkv, .webm, .mov"} multiple={true} state={props.state} />
            <div className="composition">
                <img src={moon} alt="" className="moon" />
                <div className="video" />
            </div>
            <div className="button">
                <button onClick={() => { props.setPage('music') }} className="submitBth border animation1" disabled={props.block}>Continue</button>
                <p style={{ opacity: props.block ? 1 : 0 }} className="alert">Select minimum 8 files</p>
            </div>



        </main>
        <ErrorDiv text="Upload at least 8 files in total length from 40 seconds to 10 minutes" action={props.err} />
        <Statellite />
    </>
}