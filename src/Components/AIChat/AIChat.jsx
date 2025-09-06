import { useEffect, useState, useRef } from 'react';
import '../../App.css';
import './AIChat.scss';
import axios from 'axios';
import ChatFormComp from '../FormComponent/ChatFormComp';

const lechatApiKey = import.meta.env.VITE_LECHAT_API_KEY;
console.log(lechatApiKey);

const DEFAULT_PROMPT =
  "From this moment, you will speak only about food habits. On the first user query, briefly introduce yourself and shortly explain that you will discuss food habits. For every subsequent request, give detailed, comprehensive answers—strictly on the topic of food habits. If the user asks about anything else, acknowledge that you only talk about food habits and then continue with a detailed food‑habits reply.";

const conversationHistory = [
  { role: "system", content: DEFAULT_PROMPT },
];

const fetchStory = async (value = DEFAULT_PROMPT, retries = 3) => {
  conversationHistory.push({ role: "user", content: value });

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

const animateText = (text, setText, scrollRef, shouldScrollRef, delay = 30) => {
  let index = 0;
  let animated = '';
  const animationInterval = setInterval(() => {
    animated += text[index];
    setText(animated);

    if (shouldScrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    index++;
    if (index === text.length) clearInterval(animationInterval);
  }, delay);
};

function AIChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const shouldAutoScroll = useRef(true);

  useEffect(() => {
    fetchStory().then((data) => {
      setMessages([{ role: 'assistant', content: data }]);
    });
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollHeight - scrollTop - clientHeight < 50;
      shouldAutoScroll.current = atBottom;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const addAnimatedAssistantMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    const setLastMessage = (val) => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: val };
        return updated;
      });
    };
    animateText(text, setLastMessage, messagesEndRef, shouldAutoScroll, 15);
  };

  const handleSubmit = async (value) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: value }]);
    const responseText = await fetchStory(value);
    addAnimatedAssistantMessage(responseText);
    setIsLoading(false);
  };

  return (
    <div className="ai-chat">
      <div className="chat-window">
        <div className="messages" ref={messagesContainerRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.role}`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-section">
          <ChatFormComp handleSubmit={handleSubmit} />
        </div>
        {isLoading && <div className="loading-text">Thinking...</div>}
      </div>
    </div>
  );
}

export default AIChat;
