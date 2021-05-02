
import './resetStyle.css';

import React, { useState } from "react";

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Panel from './components/uploadPanel/Panel';
import Music from './components/musicPage/MusicPage';
import uploadF from './components/uploadPanel/uploadFile';
import IntervalPanel from './components/intervalPanel/intervalPanel';
import useAudio from "./components/musicPage/useAudio";
import Download from "./components/download/download";

import './globalStyle.css';
import FilterPage from './components/filter/FilterPage';


function App() {
  let [block, setBlock] = useState(true);
  let [err, setErr] = useState(false);
  let [files, setFiles] = useState([]);
  let [audio, playing, toggle, Time, setTimePos, duration, reset, setAudio, line] = useAudio();


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
      <Header setPage={setPage} page={page} stop={reset} />
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
      {page === 'interval' && <IntervalPanel setPage={setPage} info={{
        playing: playing,
        toggle: toggle,
        Time: Time,
        duration: duration,
        reset: reset,
        audio: audio,
        line: line,
      }} />}

      {page === 'filter' && <FilterPage setPage={setPage} />}
      {page === 'download' && <Download />}
      <Footer />
    </>
  );
}

export default App;
