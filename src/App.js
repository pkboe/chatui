// import logo from "./logo.svg";
import Chat from "./components/Chat.jsx";
import { ChatProvider } from "./contexts/ChatContext";
import "./App.css";

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <h4 style={{ color: "blueviolet", cursor: "pointer" }}>
          {/* https://github.com/pkboe🌟 */}
        </h4>
        <h1 style={{ color: "#00b0ff" }}>Chat-Ui</h1>
        {/* <ChatOverlay /> */}
        <Chat />
      </div>
    </ChatProvider>
  );
}

export default App;
