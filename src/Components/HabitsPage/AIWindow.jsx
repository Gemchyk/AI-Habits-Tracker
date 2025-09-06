import { useEffect, useState, useRef } from 'react';
import './AIWindow.scss'; 
import axios from 'axios';

const lechatApiKey = import.meta.env.VITE_LECHAT_API_KEY;

const DEFAULT_PROMPT =
  "You are a helpful assistant focused on optimizing human habits for health, productivity, and well-being. Speak as a fitness-coach with a client, so you give fullfiled but not very long answers, give your client a whole understanding of what he needs to do. Analyze the array of habits provided on each next iteration. For each habit, assess whether it is beneficial or harmful, and suggest if the user should increase, reduce, or maintain the habit. Give concise but meaningful advice for improvement. You can suggest new habits, but never use array format, remember that you speak to a human. Be a little bit rude if your client doesn't complete any of habits. If no data is provided, kindly introduce yourself and ask the user to share their habits.";
const conversationHistory = [
  { role: "system", content: DEFAULT_PROMPT },
];

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