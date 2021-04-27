import react, { useState } from "react";
import Upload from "../uploadPanel/Upload";
import List from "./List";
import Tape from "./Tape"

import './style.css'

export default function MusicPage(props) {
    return <main className="container musicPanel">
        <List />
        <Upload style={{ boxSizing: 'border-box', height: '300px', }} accept={".mp3"} state={props.state} />
        <Tape audio={props.audio} info={props.info} setPage={props.setPage} />
    </main>
}