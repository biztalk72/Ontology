import { ReactFlowProvider } from '@xyflow/react';
import LeftMenu from './components/LeftMenu';
import Canvas from './components/Canvas';
import InfoPanel from './components/InfoPanel';
import ChatPanel from './components/ChatPanel';
import ControlChat from './components/ControlChat';
import './App.css';

function App() {
  return (
    <ReactFlowProvider>
      <div className="app-container">
        <LeftMenu />
        <div className="main-area">
          <Canvas />
          <InfoPanel />
          <ControlChat />
          <ChatPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
