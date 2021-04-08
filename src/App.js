
import './resetStyle.css';
import './globalStyle.css';

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Panel from './components/uploadPanel/Panel';
import Glow from './components/glow/Glow';


function App() {
  return (
    <>
      <Glow />
      <Header />
      <Panel />
      <Footer />
    </>
  );
}

export default App;
