import React, { useEffect, useState } from "react";

import PlayBth from "../musicPage/PlayBth";
import wave from "../musicPage/wave";
import Mark from "./Mark";
import Statellite from "../svgComp/statellite";
import "./style.css";
import Error from "../alert/Error";

const TapeTimeLen = 20;
let maxInterval = 3.0;
let minInterval = 1.2;

export default function IntervalPanel(props) {
    let { playing, toggle, Time, duration, reset, audio, line } = props.info;
    let [left, setLeft] = useState(0);
    let [mark, addMark] = props.mark;
    let [clear, setClear] = useState(false);
    let [generate, setGenerate] = useState(false);

    function Continue() {
        props.setPage("filter");
    }

    useEffect(() => {
        if (generate) {
            setGenerate(false);
            let arr = [];
            let curentTime = 0;
            let musicInterval = document.getElementById("musicInterval").offsetWidth;
            while (true) {
                let tmp = parseFloat((Math.random() * (maxInterval - minInterval) + minInterval).toFixed(1));
                curentTime += tmp;
                if (curentTime > TapeTimeLen - minInterval || mark.length > 30) {
                    break;
                }

                let leftMark = (curentTime) * musicInterval / TapeTimeLen;
                arr.push({
                    id: Date.now() + curentTime,
                    time: curentTime,
                    left: leftMark - 1,
                });
            }
            addMark(arr);
        }
    }, [mark]);


    function ClearAll() {
        addMark([]);
    }

    function handleClick(event) {
        if (!clear) {
            if (event.nativeEvent.offsetX > 0 && mark.length <= 40) { // was also - left
                let leftMark = event.nativeEvent.offsetX;
                let musicInterval = document.getElementById("musicInterval").offsetWidth;
                let tm = TapeTimeLen * leftMark / musicInterval;
                addMark([...mark, {
                    id: Date.now(),
                    time: parseFloat(tm.toFixed(2)),
                    left: leftMark - 1,
                }]);
            } else if (mark.length > 40) {
                props.showErr();
            }
        }
    }

    function eventMark(event) {
        if (clear) {
            let id = event.currentTarget.id;
            addMark(mark.filter(elmt => elmt.id != id));
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
    }, []);

    return <>
        <div className="container intervalPanel">
            <div className="forMark" style={{ cursor: clear ? "default" : "crosshair" }}>
                <div className="line" style={{ left: line + "%" }} />
                <div onClick={handleClick} id="musicInterval" className="border">
                    <div id="waveform" style={{ width: my_width + "%", left: "-" + left + "px", }} />
                </div>
                {/* for mark */}
                {mark.map((elmt) => {
                    return <Mark id={elmt.id} key={elmt.id} event={eventMark} style={{ left: elmt.left + "px", cursor: clear ? "pointer" : "default", }} />
                })}
            </div>
            <div className="controlPanel">
                <div>
                    <button onClick={() => setClear(!clear)} className={clear ? "submitBth border animation1 active" : "submitBth border animation1"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#6328B8" className="play" viewBox="0 0 16 16">
                            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                        </svg>
                    </button>
                    <button className="submitBth border animation1" onClick={ClearAll}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="#6328B8" className="play" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
                </div>
                <div className="generator">
                    <button onClick={() => { maxInterval = 3.0; minInterval = 1.2; ClearAll(); setGenerate(true); }} className="submitBth border animation1">Chill</button>
                    <button onClick={() => { maxInterval = 2.1; minInterval = 0.8; ClearAll(); setGenerate(true); }} className="submitBth border animation1">Dynamic</button>
                </div>
                <div>
                    <button onClick={reset} className="submitBth border animation1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#6328B8" className="play" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                    </button>
                    <PlayBth playing={playing} toggle={toggle} />
                </div>
            </div>
            <div id="intervalBth" className="container">
                <button onClick={Continue} className="submitBth border animation1" disabled={mark.length < 5} >Continue</button>
                <p style={{ opacity: mark.length < 5 ? 1 : 0 }} className="alert">Add minimum 5 marks</p>
            </div>
        </div >
        <Error text="You cannot add more than 40 marks" action={props.err} />
        <Statellite />
    </>
}