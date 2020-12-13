// import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [senderState, setSenderState] = useState([
    { id: 1, value: "Hello", origin: "sender" },
    { id: 2, value: "Hello", origin: "receiver" },
  ]);
  const [enter, setEnter] = useState(false);

  const inputRef = useRef();
  const appRef = useRef();

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
      setEnter(false);
    };
  }, [enter]);

  useEffect(() => {
    appRef.current.scrollTop = appRef.current.scrollHeight;
  }, [senderState]);
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
    inputRef.current.value = "";
  };

  return (
    <div className="App">
      <h1 style={{ color: "blueviolet" }}>Mock Chat 🚀</h1>
      <div
        ref={appRef}
        style={{
          overflowY: "scroll",
          scrollBehavior: "smooth",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "60%",
          minWidth: "300px",
          height: "400px",
          border: "solid 10px blueviolet",
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
          <div key={item.id} className={item.origin}>
            <p className={"messageContainer"}>{item.value.toString()}</p>
          </div>
        ))}
      </div>

      <div className="inputBar">
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
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
