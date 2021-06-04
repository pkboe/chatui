import { useState, useRef, useEffect } from "react";
import axios from "axios";

import "../New.css";

const NewChat = (props) => {
  const chatInputRef = useRef();
  const chatContainerRef = useRef();
  const chatButtonRef = useRef();
  const [enter, setEnter] = useState(false);
  const [senderState, setSenderState] = useState([
    { id: 1, value: "What Is Python ?", origin: "bubble you" },
  ]);

  const handleSenderMessage = async () => {
    chatInputRef.current.value = "";
    // const response = await axios.get("https://pkaychatapi.herokuapp.com/greet");
    const response = await axios.get("http://localhost:2000/greet");
    setSenderState([
      ...senderState,
      {
        id: senderState.length + 100,
        origin: "bubble you",
        value: response.data,
      },
    ]);
    console.log(senderState);

    chatInputRef.current.disabled = false;
    chatButtonRef.current.disabled = false;
  };

  const handleInputEnter = () => {
    if (chatInputRef.current.value !== "") {
      setSenderState([
        ...senderState,
        {
          id: senderState.length + 1,
          origin: "bubble me",
          value: chatInputRef.current.value,
        },
      ]);
      setEnter(true);
      chatButtonRef.current.disabled = true;
      chatInputRef.current.disabled = true;
    }
  };

  // useEffect(() => {
  //   if (enter) handleSenderMessage();
  //   return () => {
  //     setEnter(false);
  //   };
  // });
  useEffect(() => {
    console.log(Questions);
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [senderState]);

  return (
    <>
      {/* partial:index.partial.html */}
      <div className="wrapper">
        <div className="container">
          <div className="right">
            <div className="chat active-chat" ref={chatContainerRef}>
              <div className="conversation-start">
                <span>Today, 5:38 PM</span>
              </div>
              {senderState.map((item) => (
                <div key={item.id} className={item.origin}>
                  {/* <gg style={{ height: "1px" }}>{new Date().toLocaleString()}</gg> */}
                  {/* <p className={"messageContainer"}>{item.value.toString()}</p> */}
                  {item.value.toString()}
                </div>
              ))}
            </div>
            <div className="write" style={{ display: "flex" }}>
              <a href=" " className="write-link attach" />
              <input
                ref={chatInputRef}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleInputEnter();
                  }
                }}
                type="text"
                placeholder="Type Here..."
              />
              <a href=" " className="write-link smiley" />

              <button
                className="write-link-send"
                id="send-btn"
                style={{ display: "flex", outline: "none" }}
                ref={chatButtonRef}
                type="submit"
                onClick={handleInputEnter}
              ></button>
            </div>
          </div>
        </div>
      </div>
      {/* partial */}
      <div className="inputBar"></div>
    </>
  );
};

export default NewChat;
