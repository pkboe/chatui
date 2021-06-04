import { useState, useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";

import "../New.css";

const Chat = (props) => {
  const { Questions } = useChat();
  const chatInputRef = useRef();
  const chatContainerRef = useRef();
  const chatButtonRef = useRef();
  const [ResponseSheet, setResponseSheet] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState(Questions[0]);
  const [DisplaySheet, setDisplaySheet] = useState([]);

  const handleInputEnter = () => {
    if (ResponseSheet.length < Questions.length) {
      if (chatInputRef.current.value !== "") {
        //   chatButtonRef.current.disabled = true;
        //   chatInputRef.current.disabled = true;
        setResponseSheet([
          ...ResponseSheet,
          {
            id: currentQuestion.id,
            question: currentQuestion.value,
            answer: chatInputRef.current.value,
          },
        ]);
        setDisplaySheet([
          ...DisplaySheet,
          {
            type: "me",
            value: chatInputRef.current.value,
            id: currentQuestion.id + 100,
          },
        ]);
        //   let index = Questions.findIndex((todo) => todo.get("id") === id);
        //   setcurrentQuestion(Questions[length - (currentQuestion.id - 1)]);
        setcurrentQuestion(Questions[currentQuestion.id + 1]);
      }

      chatInputRef.current.value = "";
    } else {
      console.log("ResponseSheet : ", ResponseSheet);
      alert("Convo Ended ");
    }
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  });

  useEffect(() => {
    currentQuestion &&
      setDisplaySheet((DisplaySheet) => [
        ...DisplaySheet,
        {
          type: "you",
          value: currentQuestion.value,
          id: currentQuestion.id,
        },
      ]);
  }, [currentQuestion]);

  useEffect(() => {
    console.log("DisplaySheet.length", DisplaySheet.length);
  }, [DisplaySheet]);

  useEffect(() => {
    console.log("ResponseSheet.length ", ResponseSheet.length);
  }, [ResponseSheet]);

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
              {DisplaySheet.map((element) => (
                <div className={`bubble ${element.type}`} key={element.id}>
                  {/* <gg style={{ height: "1px" }}>{new Date().toLocaleString()}</gg> */}
                  {/* <p className={"messageContainer"}>{item.value.toString()}</p> */}
                  {element.value}
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
              {/* <a href=" " className="write-link smiley" /> */}

              <button
                className="write-link-send"
                id="send-btn"
                style={{
                  display: "flex",
                  outline: "none",
                  height: "100%",
                  width: "3em",
                }}
                ref={chatButtonRef}
                type="submit"
                onClick={handleInputEnter}
              ></button>
            </div>
          </div>
        </div>
      </div>
      {/* partial */}
      {/* <div className="inputBar"></div> */}
    </>
  );
};

export default Chat;
