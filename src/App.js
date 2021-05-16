
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
  let [audioFile, setAudioFile] = useState();
  let [mark, addMark] = useState([]);
  let [left, setLeft] = useState(0)
/*  const [size, setSize] = useState('');*/
  let [page, setPage] = useState('main');
  const [filter,setFilter] = useState('original');

  let showErr = () => {
    setErr(true);
    setTimeout(() => {
      setErr(false);
    }, 6000);
  }

  let uploadFiles = uploadF(setBlock, showErr, setFiles);
  return (
    <>
      <Header setPage={setPage} page={page} stop={reset} />
      {page === 'main' && <Panel state={uploadFiles} err={err} block={block} setPage={setPage} />}
      {page === 'music' && <Music setLeft={setLeft} setPage={setPage} info={{
        setAudio: setAudio,
        setAudioFile: setAudioFile,
        audio: audio,
        playing: playing,
        toggle: toggle,
        Time: Time,
        setTime: setTimePos,
        duration: duration,
        stop: reset,
        left: left,
        setLeft: setLeft,
      }} />}
      {page === 'interval' && <IntervalPanel err={err} showErr={showErr} mark={[mark, addMark]} setPage={setPage} info={{
        playing: playing,
        toggle: toggle,
        Time: Time,
        duration: duration,
        reset: reset,
        audio: audio,
        line: line,
      }} />}

      {page === 'filter' && <FilterPage filter={[filter,setFilter]} setPage={setPage} />}
      {page === 'download' && <Download audio={audioFile} time={Time} mark={mark} filter={filter} files={files} />}
      <Footer />
    </>
  );
}

export default App;
