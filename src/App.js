
import './resetStyle.css';

import react, { useState } from "react";

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Panel from './components/uploadPanel/Panel';
import Music from './components/musicPage/MusicPage';

import './globalStyle.css';


function App() {
  let [audio, setAudio] = useState();

  function handleUpload(event) {
    setAudio(event.target.files[0]);
  }

  return (
    <>
      <Header />
      {/* <Panel /> */}
      <Music state={handleUpload} audio={audio} />
      <Footer />
    </>
  );
}

export default App;
