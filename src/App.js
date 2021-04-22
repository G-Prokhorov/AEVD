
import './resetStyle.css';

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Panel from './components/uploadPanel/Panel';
import Music from './components/musicPage/MusicPage';

import './globalStyle.css';


function App() {
  return (
    <>
      <Header />
      {/* <Panel /> */}
      <Music />
      <Footer />
    </>
  );
}

export default App;
