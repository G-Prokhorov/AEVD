
import './resetStyle.css';

import react, { useState } from "react";

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Panel from './components/uploadPanel/Panel';
import Music from './components/musicPage/MusicPage';
import uploadF from './components/uploadPanel/uploadFile';

import './globalStyle.css';


function App() {
  let [audio, setAudio] = useState();
  let [block, setBlock] = useState(true);
  let [err, setErr] = useState(false);
  let [files, setFiles] = useState([]);

  let showErr = () => {
    setErr(true);
    setTimeout(() => {
      setErr(false);
    }, 4000);
  }

  let uploadAudio = (event) => {
    setAudio(event.target.files[0]);
  }

  let uploadFiles = uploadF(setBlock, showErr);

  return (
    <>
      <Header />
      <Panel state={uploadFiles} err={err} block={block} />
      {/* <Music state={uploadAudio} audio={audio} /> */}
      <Footer />
    </>
  );
}

export default App;
