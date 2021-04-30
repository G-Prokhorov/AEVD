import { useState, useEffect } from "react";
const TapeTimeLen = 20;

const useAudio = () => {
    const [audio] = useState(new Audio());
    const [playing, setPlaying] = useState(false);
    const [Time, setTime] = useState(0);
    const [Duration, setDuration] = useState(-2);
    const [line, setLine] = useState(0);
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

    const reset = () => {
        setLine(0)
        setPlaying(false);
        audio.pause();
        audio.currentTime = Time;
    }

    useEffect(() => {
        playing ? audio.play() : audio.pause();
        if (playing) {
            let next = line;
            let tmp = setInterval(() => {
                next += 0.098;
                if (next < 100) {
                    setLine(next);
                }

            }, 20);

            return () => {
                clearInterval(tmp);
            }
        }
    }, [playing]);

    useEffect(() => {
        if (playing) {
            let myTimer = setInterval(() => {
                if (audio.currentTime >= Time + TapeTimeLen) {
                    reset();
                }
            }, 500);
            return () => {
                clearInterval(myTimer);
            }
        }
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        audio.addEventListener("loadedmetadata", function () {
            setDuration(audio.duration);
        });
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return [audio, playing, toggle, Time, setTimePos, Duration, reset, setAudio, line];
};

export default useAudio;