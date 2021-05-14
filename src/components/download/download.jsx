import {React, useEffect, useState} from "react";
import "./style.css";
import Axios from "axios";
import Animation from "./animation";

export default function Download(props) {
    const [downloadState, setState] = useState(false);
    const [MyLink, setLink] = useState();

    const save = () => {
        MyLink.click();
    }

    useEffect(() => {
        (async function () {
            try {
                let data = new FormData();
                data.append("audio", props.audio);
                props.files.forEach((element) => {
                    data.append("file", element);
                });
                data.append("time", props.time);
                data.append("mark", props.mark);
                data.append("filter", props.filter);
                data.append("size", props.size);
                let res = await Axios.post("http://localhost:5000/upload", data);
                let result = await Axios.get("http://localhost:5000/upload", {
                    responseType: 'blob',
                    timeout: 30000,
                });
                console.log(result);
                if (result) {
                    let blob = result.data
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
                }
            } catch (e) {
                console.error("Error while upload files. " + e)
            }
        })()
    }, [])

    return <div className="download">
        {downloadState ?  <div>
            <p>Done &#128156;</p>
            <button onClick={save} className="animation1 border submitBth downloadBth">Download
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#6328b8"
                     className="save" viewBox="0 0 16 16">
                    <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path
                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
            </button>
        </div> :  <div className="animationLoad">
            <Animation />
        </div>}
    </div>
}