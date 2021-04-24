import react, { useState, useEffect } from "react";
import audio from "./audio.mp3";
import WaveSurfer from 'wavesurfer.js';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [Time, setTime] = useState(0);
    const [TapeLen, setTapeLen] = useState(100);

    audio.volume = 0.1;

    const toggle = () => setPlaying(!playing);

    const setTimePos = (target) => {
        setPlaying(false);
        let width = target.offsetWidth / 15;
        setTime(Math.round(target.scrollLeft / width));
    }


    useEffect(() => {
        audio.currentTime = Time;
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        if (playing) {
            let myTimer = setInterval(() => {
                console.log("here");
                if (audio.currentTime > Time + 15) {
                    setPlaying(false);
                }
            }, 1000);
            return () => {
                clearInterval(myTimer);
            }
        }
    }, [playing])

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        audio.addEventListener("loadedmetadata", function () {
            setTapeLen(((audio.duration + 2) / 15) * 100);
        });
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle, Time, setTimePos, TapeLen];
};

export default function Tape() {
    const [playing, toggle, Time, setTimePos, my_width] = useAudio(audio);
    function scroll(event) {
        setTimePos(event.target);
    }

    useEffect(() => {
        let waveform = WaveSurfer.create({
            barWidth: 5,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'WebAudio',
            height: 100,
            progressColor: '#7e3fcb',
            responsive: true,
            waveColor: '#7e3fcb',
            cursorColor: 'transparent',
        });

        waveform.load(audio);

        return () => {
            waveform.destroy();
        }
    }, [audio])

    return <div className="tape">
        <div className="time">
            <span>{Math.floor(Time / 60)}:{Time % 60}</span>
            <span>{Math.floor((Time + 15) / 60)}:{(Time + 15) % 60}</span>
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

    </div >
}