import react from "react";
import Upload from "../uploadPanel/Upload";
import List from "./List";
import Tape from "./Tape"

import './style.css'

export default function MusicPage() {
    return <main className="container musicPanel">
        <List />
        <Upload style={{ boxSizing: 'border-box', height: '100%', }} />
        <Tape />
    </main>
}