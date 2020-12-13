// import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [senderState, setSenderState] = useState([
    { id: 1, value: "Hello", origin: "sender" },
    { id: 1, value: "Hello", origin: "receiver" },
  ]);
  const [enter, setEnter] = useState(false);

  const inputRef = useRef();

  const handleInputEnter = () => {
    setSenderState([
      ...senderState,
      {
        id: senderState.length + 1,
        origin: "sender",
        value: inputRef.current.value,
      },
    ]);
    setEnter(true);
  };

  useEffect(() => {
    if (enter) handleSenderMessage();
    return () => {
      inputRef.current.value = "";
      setEnter(false);
    };
  }, [enter]);
  const handleSenderMessage = async () => {
    const response = await axios.get("http://127.0.0.1:2000/greet");
    setSenderState([
      ...senderState,
      {
        id: senderState.length + 100,
        origin: "receiver",
        value: response.data,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Interview Bot</h1>
      <div
        conte
        style={{
          overflowY: "scroll",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "60%",
          minWidth: "300px",
          height: "400px",
          border: "solid 14px blueviolet",
          borderRadius: "10px",
          paddingLeft: "5px",
          paddingRight: "5px",

          // maxWidth: "250px",
        }}
      >
        {/* <div className="receiver">+
          <p>Hi</p>
        </div> */}
        {senderState.map((item) => (
          <div className={item.origin}>
            <p className={"messageContainer"}>{item.value.toString()}</p>
          </div>
        ))}
      </div>
      <div className="InputBar">
        <input
          ref={inputRef}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleInputEnter();
            }
          }}
          type="text"
          placeholder="Type Something..."
        />
        <button type="submit" onClick={handleInputEnter}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
