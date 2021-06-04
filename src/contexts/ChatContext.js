import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [loading, setloading] = useState(true);
  const [Questions, setQuestions] = useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      const URL = `http://127.0.0.1:5000/api/questions/python?totalquestions=15`;
      await axios.get(URL, {}).then((data) => {
        let questions = [];

        Object.keys(data.data).forEach((key) =>
          questions.push({ id: key - 1, value: data.data[key].question })
        );
        setQuestions(questions);
        setloading(false);
      });
    };
    return fetchQuestions();
  }, []);

  const value = {
    Questions,
  };

  return (
    <ChatContext.Provider value={value}>
      {!loading && Questions && children}
    </ChatContext.Provider>
  );
}
