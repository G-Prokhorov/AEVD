
import './resetStyle.css';

import React, { useState } from "react";

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Panel from './components/uploadPanel/Panel';
import Music from './components/musicPage/MusicPage';
import uploadF from './components/uploadPanel/uploadFile';
import IntervalPanel from './components/intervalPanel/intervalPanel';
import useAudio from "./components/musicPage/useAudio";

import './globalStyle.css';


function App() {
  let [block, setBlock] = useState(true);
  let [err, setErr] = useState(false);
  let [files, setFiles] = useState([]);
  let [audio, playing, toggle, Time, setTimePos, duration, reset, setAudio] = useAudio();


  let [page, setPage] = useState('main');

  let showErr = () => {
    setErr(true);
    setTimeout(() => {
      setErr(false);
    }, 4000);
  }

  let uploadFiles = uploadF(setBlock, showErr, setFiles);
  return (
    <>
      <Header setPage={setPage} stop={reset} />
      {page === 'main' && <Panel state={uploadFiles} err={err} block={block} setPage={setPage} />}
      {page === 'music' && <Music setPage={setPage} info={{
        setAudio: setAudio,
        audio: audio,
        playing: playing,
        toggle: toggle,
        Time: Time,
        setTime: setTimePos,
        duration: duration,
        stop: reset,
      }} />}
      {page === 'interval' && <IntervalPanel info={{
        playing: playing,
        toggle: toggle,
        Time: Time,
        duration: duration,
        reset: reset,
        audio: audio,
      }} />}
      <Footer />
    </>
  );
}

export default App;
