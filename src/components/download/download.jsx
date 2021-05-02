import {React, useEffect, useState} from "react";
import "./style.css";
import Axios from "axios";
import Animation from "./animation";

export default function Download() {
    let [downloadState, setState] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let result = await Axios.post("http://localhost:5000/upload")
                if (result) {
                    setState(true)
                }
            } catch (e) {
                console.error("Error while upload files. " + e)
            }

        })()
    }, [])

    return <div className="download">
        {downloadState ?  <div>
            Done
        </div> :  <div className="animationLoad">
            <Animation />
        </div>}
    </div>
}