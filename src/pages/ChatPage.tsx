import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import GunContext from "../contextes/gun";

type Message = {
  from: string;
  message: string;
  timestamp: number;
};

const ChatPage = () => {
  const params = useParams();
  const { username } = params;

  const [inputMessage, setInputMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const gun = useContext(GunContext);
  if (!gun) {
    throw new Error("Gun not found");
  }

  useEffect(() => {
    gun
      .get("chat")
      .map()
      .once(message => {
        setMessages(prev => [
          ...prev,
          {
            from: message.from,
            message: message.message,
            timestamp: message.timestamp,
          },
        ]);
      });
  }, [gun]);

  const handleMessageSend = () => {
    gun
      .get("chat")
      .get(`${username}-${Date.now()}`)
      .put({ from: username, message: inputMessage, timestamp: Date.now() });

    setInputMessage("");
  };

  return (
    <>
      <Navbar username={username} />
      {/* Container */}
      <div className="flex flex-col items-center justify-between h-4/5">
        {/* Chat Window */}
        <div className="w-full h-full bg-slate-400">
          {messages.map(msg => {
            return <pre>{JSON.stringify(msg, null, 2)}</pre>;
          })}
        </div>
        {/* Input field */}
        <div className="flex items-center justify-center w-full gap-0 space-y-4 border">
          <input
            type="text"
            placeholder="Message"
            value={inputMessage}
            className="flex-[4] p-2 text-black"
            onChange={e => setInputMessage(e.target.value)}
            required
          />
          <button
            style={{ margin: 0 }}
            onClick={handleMessageSend}
            className="flex-[1] p-2 text-white bg-pink-700 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
