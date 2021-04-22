import react, { useState, useEffect } from "react";
import audio from "./audio.mp3"

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [scrollPos, setScr] = useState(0);
    const [duration, setDuration] = useState(100)

    const toggle = () => setPlaying(!playing);

    const setScroll = (target) => {
        let width = target.offsetWidth / 15;
        setScr(Math.floor(target.scrollLeft / width));
    }


    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        audio.addEventListener("loadedmetadata", function () {
            setDuration(Math.floor(audio.duration) * 100 / 15);
        });
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);
    return [playing, toggle, scrollPos, setScroll, duration];
};

export default function Tape() {
    const [playing, toggle, scrollPos, setScroll, my_width] = useAudio(audio);
    function scroll(event) {
        setScroll(event.target);
    }

    return <div className="tape">
        <div className="time">
            <span>{Math.floor(scrollPos / 60)}:{scrollPos % 60}</span>
            <span>{Math.floor((scrollPos + 15) / 60)}:{(scrollPos + 15) % 60}</span>
        </div>
        <div className="tapePanel">
            <div id="tape" className="tapeMusic border" onScroll={scroll}>
                <div id="soundtrack" class="soundtrack" style={{ width: my_width + "%" }}></div>
            </div>
            <button onClick={toggle} className="playBth border animation1">
                {!playing ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#6328B8" className="play" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#6328B8" className="play" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                    </svg>}
            </button>
        </div>

    </div>
}