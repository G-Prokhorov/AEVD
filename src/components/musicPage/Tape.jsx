import react, { useState, useEffect } from "react";
import wave from "./wave";
import useAudio from "./useAudio";

const TapeTimeLen = 20;

export default function Tape(props) {
    function scroll(event) {
        setTimePos(event.target);
    }

    function Continue() {
        props.setPage("interval");
        props.info(prev => {
            return {
                ...prev,
                start: Time,
            }
        })
    }

    let [playing, toggle, Time, setTimePos, my_width, setAudio] = useAudio(props.info);

    useEffect(() => {
        if (props.audio) {
            let audio = URL.createObjectURL(props.audio);
            setAudio(audio)
            let waveform = wave('#waveform', audio);
            return () => {
                waveform.destroy();
            }
        }
    }, [props.audio])

    return <div className="tape">
        <div className="time">
            <span>{Math.floor(Time / 60)}:{Time % 60}</span>
            <span>{Math.floor((Time + TapeTimeLen) / 60)}:{(Time + TapeTimeLen) % 60}</span>
        </div>
        <div className="tapePanel">
            <div id="tape" className="tapeMusic border" onScroll={scroll}>
                <div id="waveform" class="soundtrack" style={{ width: my_width + "%" }}></div>
            </div>
            <button onClick={toggle} className="playBth border animation1">
                {!playing ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#6328B8" className="play" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#6328B8" className="play" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                    </svg>}
            </button>
        </div>
        <button onClick={Continue} className="musicContinue submitBth border animation1">Continue</button>

    </div >
}