import react, { useEffect, useState } from "react";

import PlayBth from "../musicPage/PlayBth";
import wave from "../musicPage/wave";

import "./style.css";

const TapeTimeLen = 20;

export default function IntervalPanel(props) {
    let { playing, toggle, Time, duration, reset, audio } = props.info;
    let [left, setLeft] = useState(0);

    function handleClick(event) {
        if (event.nativeEvent.offsetX - left > 0) {
            console.log(event.nativeEvent.offsetX - left)
        }
    }

    let my_width = duration != 0 ? ((duration + 2) / TapeTimeLen) * 100 : 100;

    useEffect(() => {
        let musicInterval = document.getElementById("musicInterval").offsetWidth;
        let fromLeft = Time * musicInterval / TapeTimeLen;
        setLeft(fromLeft);
    }, [Time]);

    useEffect(() => {
        if (audio.src) {
            let waveform = wave('#waveform', audio);
            return () => {
                waveform.destroy();
            }
        }
    }, [])

    return <div className="container intervalPanel">
        <div className="forMark">
            <div onClick={handleClick} id="musicInterval" className="border">
                <div id="waveform" style={{ width: my_width + "%", left: "-" + left + "px", }}></div>
            </div>
            {/* for mark */}
            <div className="mark">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" className="markSVG" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
                <div></div>
            </div>
        </div>
        <div className="controlPanel">
            <div>
                <button className="submitBth border animation1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#6328B8" className="play" viewBox="0 0 16 16">
                        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                    </svg>
                </button>
                <button className="submitBth border animation1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="#6328B8" className="play" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                </button>
            </div>
            <button className="submitBth border animation1 generator">Auto generate</button>
            <div>
                <button onClick={reset} className="submitBth border animation1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#6328B8" className="play" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                    </svg>
                </button>
                <PlayBth playing={playing} toggle={toggle} />
            </div>
        </div>
    </div >
}