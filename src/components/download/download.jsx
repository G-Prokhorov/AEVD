import { React, useEffect, useState } from "react";
import "./style.css";
import Axios from "axios";
import Animation from "./animation";
import Statellite from "../svgComp/statellite";

export default function Download(props) {
    const [downloadState, setState] = useState(false);
    const [MyLink, setLink] = useState();
    const [err, setErr] = useState();

    const save = () => {
        MyLink.click();
    }

    console.log(err)

    useEffect(() => {
        (async function () {
            try {
                let data = new FormData();
                data.append("audio", props.audio);
                props.files.forEach((element) => {
                    data.append("file", element);
                });
                data.append("time", props.time);
                data.append("mark", JSON.stringify(props.mark));
                data.append("filter", props.filter);
                /*data.append("size", props.size);*/
                let res = await Axios.post("http://localhost:5000/upload", data);
                if (res.status === 200) {
                    let result = await Axios.get("http://localhost:5000/upload", {
                        responseType: 'blob',
                        timeout: 30000,
                    });
                    if (result.status === 304 || result.status === 200) {
                        let blob = result.data;
                        const url = await window.URL.createObjectURL(
                            new Blob([blob]),
                        );
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute(
                            'download',
                            `AEVD.mp4`,
                        );
                        document.body.appendChild(link);
                        link.click();
                        setLink(link)
                        setState(true)
                        return () => link.parentNode.removeChild(link);
                    } else {
                        if (result.status === 500) {
                            setState(false)
                            new Error("Server error")
                        }
                    }
                }
else {
                    setState(false)
                    new Error("Failed to make video. Try to put more markers or upload more files.")
                }
            } catch (e) {
                setState(false)
                setErr(e.message + ". Failed to make video. Try to put more or less markers or upload more files.");
                console.error("Error while upload files. " + e)
            }
        })()
    }, [])

    function show() {
        if (!err) {
            return <div className="animationLoad">
                <Animation />
            </div>
        }
    }

    return <div className="download">
        {downloadState ? <div>
            <p>Done &#128156;</p>
            <button onClick={save} className="animation1 border submitBth downloadBth">Download
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#6328b8"
                     className="save" viewBox="0 0 16 16">
                    <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path
                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
            </button>
            <Statellite />
        </div> : <>
            <p style={{ display: err ? "block" : "none" }}> {err} &#128156; < /p>
            {show()}
        </>
        }
    </div>
}