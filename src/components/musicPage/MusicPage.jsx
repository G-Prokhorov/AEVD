import React, {useEffect, useState} from "react";
import Upload from "../uploadPanel/Upload";
import List from "./List";
import Tape from "./Tape"

import './style.css'
import Axios from "axios";

export default function MusicPage(props) {

    let { setAudio, setAudioFile, ...Next } = props.info;
    let [musicList, setList] = useState([])

    const chooseInList = async event => {
        props.setLeft(0);
        let audio = await Axios.get("http://localhost:5000/getMusic/" + event.currentTarget.id, {
            responseType: 'blob',
            timeout: 30000,});
        let blob = new Blob([audio.data]);
        const url = await window.URL.createObjectURL(blob);
        setAudio(url);
        const file = await new File([blob], "audio.mp3");
        setAudioFile(file);
    }

    let uploadAudio = (event) => {
        let audio = URL.createObjectURL(event.target.files[0]);
        setAudioFile(event.target.files[0]);
        setAudio(audio);
    }

    useEffect(() => {
        (async function () {
            let music = await Axios.get("http://localhost:5000/music");
            setList(music.data);
        })()
    }, []);

    return <main className="container musicPanel">
        <List onClick={chooseInList} musicList={musicList} />
        <Upload style={{ boxSizing: 'border-box', height: '300px', }} accept={".mp3"} state={uploadAudio} />
        <Tape info={Next} setPage={props.setPage} />
    </main>
}