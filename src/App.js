
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

  let [page, setPage] = useState('main');

  let showErr = () => {
    setErr(true);
    setTimeout(() => {
      setErr(false);
    }, 4000);
  }

  let uploadAudio = (event) => {
    setAudio(event.target.files[0]);
  }

  let uploadFiles = uploadF(setBlock, showErr, setFiles);
  console.log(files);
  return (
    <>
      <Header setPage={setPage} />
      {page === 'main' && <Panel state={uploadFiles} err={err} block={block} setPage={setPage} />}
      {page === 'music' && <Music state={uploadAudio} audio={audio} setPage={setPage} />}
      <Footer />
    </>
  );
}

export default App;
