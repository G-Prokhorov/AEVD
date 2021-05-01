import React, { useEffect, useState } from "react";
import Error from "../err/Error";
import PlayBth from "./PlayBth";
import wave from "./wave";

const TapeTimeLen = 20;

export default function Tape(props) {
    let [err, setErr] = useState(false);

    function scroll(event) {
        setTime(event.target);
    }
    function Continue() {
        stop()
        props.setPage("interval");
    }

    let { audio, playing, toggle, Time, setTime, duration, stop } = props.info;

    useEffect(() => {
        if (duration < 20) {
            setErr(true);
            let timeout = setTimeout(() => {
                setErr(false);
            }, 5000);

            return () => { clearTimeout(timeout) }
        }

    }, [duration])

    useEffect(() => {
        if (audio.src) {
            let waveform = wave('#waveform', audio);
            return () => {
                waveform.destroy();
            }
        }
    }, [audio.src]);

    let my_width = duration != 0 ? ((duration + 2) / TapeTimeLen) * 100 : 100;

    return <div className="tape">
        <div className="time">
            <span>{Math.floor(Time / 60)}:{Time % 60}</span>
            <span>{Math.floor((Time + TapeTimeLen) / 60)}:{(Time + TapeTimeLen) % 60}</span>
        </div>
        <div className="tapePanel">
            <div id="tape" className="tapeMusic border" onScroll={scroll}>
                <div id="waveform" className="soundtrack" style={{ width: my_width + "%" }}></div>
            </div>
            <PlayBth playing={playing} toggle={toggle} />
            <Error text="Upload a file at least 20 seconds long" action={err} />
        </div>
        <button onClick={Continue} className="musicContinue submitBth border animation1" disabled={duration < 20 ? true : false} >Continue</button>
    </div >
}