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
  const buttonRef = useRef();

  const handleInputEnter = () => {
    if (inputRef.current.value !== "") {
      setSenderState([
        ...senderState,
        {
          id: senderState.length + 1,
          origin: "sender",
          value: inputRef.current.value,
        },
      ]);
      setEnter(true);
      buttonRef.current.disabled = true;
      inputRef.current.disabled = true;
    }
  };

  useEffect(() => {
    if (enter) handleSenderMessage();
    return () => {
      setEnter(false);
    };
  });

  useEffect(() => {
    appRef.current.scrollTop = appRef.current.scrollHeight;
  }, [senderState]);
  const handleSenderMessage = async () => {
    const response = await axios.get("https://pkaychatapi.herokuapp.com/greet");
    setSenderState([
      ...senderState,
      {
        id: senderState.length + 100,
        origin: "receiver",
        value: response.data,
      },
    ]);
    inputRef.current.value = "";
    inputRef.current.disabled = false;
    buttonRef.current.disabled = false;
  };

  return (
    <div className="App">
      <h4 style={{ color: "blueviolet", cursor: "pointer" }}>
        https://github.com/pkboe🌟
      </h4>
      <h1 style={{ color: "blueviolet" }}>MockUp Interview Chat 🚀</h1>
      <div
        ref={appRef}
        className="chatContainer"
        z
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
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
            {/* <gg style={{ height: "1px" }}>{new Date().toLocaleString()}</gg> */}
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
        <button ref={buttonRef} type="submit" onClick={handleInputEnter}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
