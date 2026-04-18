import { useEffect, useState, useRef } from 'react';
import './AIWindow.scss'; 
import { DEFAULT_PROMPT } from '../../store/aiStorageslice';
import axios from 'axios';
// import { useSelector } from 'react-redux';

const lechatApiKey = import.meta.env.VITE_LECHAT_API_KEY;


const fetchConvHistory = async () => {
    try{
      const res = await fetch('http://localhost:5050/history/messages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }catch(e){
      console.log(e);
    }
}

const addMessageToHistory = async (message) => {
    try{
      const res = await fetch('http://localhost:5050/history/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message})
      });
    }catch(e){
      console.log(e);
    }
}  

// addMessageToHistory(DEFAULT_PROMPT);
 
console.log(fetchConvHistory());
//TODO: fix returning undefined result


const conversationHistory = [
  { role: "system", content: DEFAULT_PROMPT },
];
//TODO: Connect Database to fetch coversation history

const fetchStory = async (value = DEFAULT_PROMPT, retries = 3) => {
  conversationHistory.push({ role: "user", content: JSON.stringify(value) });

  if (!lechatApiKey) {
    throw new Error("Le Chat API key is not set.");
  }

  try {
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: "mistral-tiny",
        messages: conversationHistory
      },
      {
        headers: {
          'Authorization': `Bearer ${lechatApiKey}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    conversationHistory.push({ role: "assistant", content: reply });
    return reply;

  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      setTimeout(() => fetchStory(value, retries - 1), 10000);
    } else {
      console.error("Error fetching story:", error);
    }
  }
};



function AIWindow({ habits }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      fetchStory(habits)
        .then((data) => {
          setMessages([{ role: 'assistant', content: data }]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [habits]);

  return (
    <div className="ai-window">
      <div className="ai-chat-window">
        <div className="ai-messages" ref={messagesContainerRef}>
          {messages[0] && (
            <div className="ai-message">
              {messages[0].content}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {isLoading && (
          <div className="ai-loading">Thinking...</div>
        )}
      </div>
    </div>
  );
}

export default AIWindow;