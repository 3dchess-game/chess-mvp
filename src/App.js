import "./App.scss";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./views/Welcome";
import GameSelect from "./components/UI/GameSelect/GameSelect";
import Level from "./components/UI/Level/Level";
import FriendPlay from "./views/FriendPlay";
import GameScene from "./views/GameScene";
import MatchPlay from "./views/MatchPlay";
import Orientation from "./components/UI/Orientation/Orientation";
import Connect from "./components/UI/Connect/Connect";
import Ranking from "./components/UI/Ranking/Ranking";
import { ConnectWalletButton, MacModalTrigger } from 'wallet-connect-modal';
import 'wallet-connect-modal/dist/wallets/phantom/styles.css';
import 'wallet-connect-modal/dist/wallets/metamask/styles.css';
import 'wallet-connect-modal/dist/wallets/rabby/styles.css';
import 'wallet-connect-modal/dist/wallets/tronlink/styles.css';
import 'wallet-connect-modal/dist/wallets/bitget/styles.css';
import 'wallet-connect-modal/dist/wallets/coinbase/styles.css';
import 'wallet-connect-modal/dist/wallets/mac/styles.css';

function App() {
  const [orientation, setOrientation] = useState(false);
  const walletButtonRef = useRef(null);

  useEffect(() => {
    window.screen.orientation.lock("landscape").catch((e) => {
      console.log(e);
    });
    window.addEventListener(
      "resize",
      function () {
        setOrientation(window.innerHeight > window.innerWidth);
      },
      false
    );
    setOrientation(window.innerHeight > window.innerWidth);
  }, []);

  // Set up global function to trigger wallet connect button
  useEffect(() => {
    const triggerWalletConnect = () => {
      if (walletButtonRef.current) {
        // Try to find the button element - it might be nested
        const button = walletButtonRef.current.querySelector('button') || 
                       walletButtonRef.current.querySelector('[role="button"]') ||
                       walletButtonRef.current;
        
        if (button && typeof button.click === 'function') {
          button.click();
        } else {
          // Fallback: try to find any clickable element
          const clickableElement = walletButtonRef.current.querySelector('[onclick], button, a, [role="button"]');
          if (clickableElement && typeof clickableElement.click === 'function') {
            clickableElement.click();
          }
        }
      }
    };

    // Make it available globally for other components to trigger
    window.triggerWalletConnect = triggerWalletConnect;

    return () => {
      delete window.triggerWalletConnect;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Mount MacModalTrigger once with same userId to enable Mac modal behavior */}
        <MacModalTrigger userId="mighty" backendConfig={{ enabled: true }} />
      {/* <Layout> */}
        {/* Header wallet connect button - all other buttons will trigger this */}
        <div ref={walletButtonRef} style={{ display: 'none' }}>
          <ConnectWalletButton userId="mighty" />
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/games" element={<GameSelect />} />
          <Route path="/matchPlay" element={<MatchPlay />} />
          <Route path="/friendPlay/*" element={<FriendPlay />} />
          <Route path="/machinePlay" element={<Level />} />
          <Route path="/gameScene" element={<GameScene />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/ranking" element={ <Ranking /> } />
        </Routes>
          <Orientation show={orientation}></Orientation>
        {/* </Layout> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
