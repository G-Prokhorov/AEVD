import react, { useState, useEffect } from "react";
const TapeTimeLen = 20;

const useAudio = () => {
    const [audio] = useState(new Audio());
    const [playing, setPlaying] = useState(false);
    const [Time, setTime] = useState(0);
    const [TapeLen, setTapeLen] = useState(100);
    audio.volume = 0.1;

    const toggle = () => setPlaying(!playing);

    const setTimePos = (target) => {
        setPlaying(false);
        let width = target.offsetWidth / TapeTimeLen;
        setTime(Math.round(target.scrollLeft / width));
        audio.currentTime = Time;
    }

    const setAudio = (url) => {
        setPlaying(false);
        audio.pause();
        audio.src = url;
        audio.load();
    }

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        if (playing) {
            let myTimer = setInterval(() => {
                if (audio.currentTime >= Time + TapeTimeLen) {
                    audio.pause();
                    setPlaying(false);
                    audio.currentTime = Time;
                }
            }, 500);
            return () => {
                clearInterval(myTimer);
            }
        }
    }, [playing])

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        audio.addEventListener("loadedmetadata", function () {
            setTapeLen(((audio.duration + 2) / TapeTimeLen) * 100);
        });
        return () => {
            audio.pause();
            // audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggle, Time, setTimePos, TapeLen, setAudio];
};

export default useAudio;