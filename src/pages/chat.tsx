import { useState } from 'react';
import styles from './chat.module.css';

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    setChatHistory(conversation.history);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        sender: 'user',
        content: messageInput.trim(),
      };

      setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['chat-container']}>
        <div className={styles['conversations-list']}>
          <h2>Conversations</h2>
          {conversations.map((conversation, index) => (
            <div
              className={`${styles['conversation-item']} ${
                selectedConversation === conversation ? styles.active : ''
              }`}
              key={index}
              onClick={() => handleConversationClick(conversation)}
            >
              {conversation.name}
            </div>
          ))}
        </div>
        <div className={styles['chat-area']}>
          <div className={styles['chat-history']}>
            {chatHistory.map((message, index) => (
              <div
                className={`${styles['chat-message']} ${
                  message.sender === 'user' ? styles['user-message'] : styles['bot-message']
                }`}
                key={index}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className={styles['chat-input-container']}>
            <input
              type="text"
              className={styles['chat-input']}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={handleSendMessage} className={styles['chat-button']}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
