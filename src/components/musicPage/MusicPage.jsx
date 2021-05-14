import React from "react";
import Upload from "../uploadPanel/Upload";
import List from "./List";
import Tape from "./Tape"

import './style.css'

export default function MusicPage(props) {

    let { setAudio, setAudioFile, ...Next } = props.info;

    let uploadAudio = (event) => {
        let audio = URL.createObjectURL(event.target.files[0]);
        setAudioFile(event.target.files[0]);
        setAudio(audio);
    }

    return <main className="container musicPanel">
        <List />
        <Upload style={{ boxSizing: 'border-box', height: '300px', }} accept={".mp3"} state={uploadAudio} />
        <Tape info={Next} setPage={props.setPage} />
    </main>
}