import react, { useEffect } from "react";
import PlayBth from "./PlayBth";
import wave from "./wave";

const TapeTimeLen = 20;

export default function Tape(props) {
    function scroll(event) {
        setTime(event.target);
    }

    function Continue() {
        stop()
        props.setPage("interval");
    }

    let { audio, playing, toggle, Time, setTime, duration, stop } = props.info;
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
                <div id="waveform" class="soundtrack" style={{ width: my_width + "%" }}></div>
            </div>
            <PlayBth playing={playing} toggle={toggle} />
        </div>
        <button onClick={Continue} className="musicContinue submitBth border animation1">Continue</button>

    </div >
}