import React, { useState } from 'react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    // Simulate bot response
    const botResponse = await getBotResponse(input);

    // Add bot's response
    setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    setInput('');
  };

  const getBotResponse = async (userInput: string): Promise<string> => {
    // Replace this with your backend logic if necessary
    return new Promise((resolve) =>
      setTimeout(() => resolve(`You said: "${userInput}"`), 1000)
    );
  };

  return (
    <div className="max-w-md  w-full h-full p-4 rounded-lg shadow text-black">
      <div className="h-80 overflow-y-auto bg-white p-4 rounded-lg border border-gray-300">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-2 rounded-lg text-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l-lg border-gray-300 outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
