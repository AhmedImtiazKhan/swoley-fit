import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles, Zap } from 'lucide-react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI personal trainer. I can help you with workout tips, form corrections, nutrition advice, and motivation. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Hide tooltip after 5 seconds, but bring it back every 30 seconds
  useEffect(() => {
    const hideTooltip = setTimeout(() => setShowTooltip(false), 5000);
    
    const showTooltipInterval = setInterval(() => {
      if (!isOpen) {
        setShowTooltip(true);
        setPulseAnimation(true);
        setTimeout(() => {
          setShowTooltip(false);
          setPulseAnimation(false);
        }, 4000);
      }
    }, 30000);

    return () => {
      clearTimeout(hideTooltip);
      clearInterval(showTooltipInterval);
    };
  }, [isOpen]);

  // Simulated AI responses
  const getAIResponse = (userMessage) => {
    const responses = {
      workout: [
        "For optimal muscle growth, focus on progressive overload - gradually increase weight, reps, or sets each week.",
        "Remember to maintain proper form over heavy weight. Quality reps build muscle, sloppy reps cause injuries.",
        "Consider compound movements like squats, deadlifts, and bench press for maximum muscle activation.",
        "Try the 2-second pause at the bottom of your reps - it increases time under tension and muscle activation!"
      ],
      nutrition: [
        "Aim for 1.6-2.2g of protein per kg of body weight for muscle building.",
        "Don't forget carbs! They fuel your workouts. Complex carbs 2-3 hours before training work best.",
        "Stay hydrated - aim for 3-4 liters of water daily, more on training days.",
        "Post-workout nutrition window: consume protein within 30 minutes for optimal recovery."
      ],
      form: [
        "Keep your core engaged throughout all movements to protect your spine.",
        "Control the eccentric (lowering) phase of each rep - this is where muscle damage occurs.",
        "Full range of motion beats partial reps with heavier weight every time.",
        "Mind-muscle connection: focus on feeling the target muscle working during each rep."
      ],
      motivation: [
        "Progress isn't always linear. Some days will be harder than others, and that's normal!",
        "Consistency beats perfection. A mediocre workout is better than no workout.",
        "Remember why you started. Your future self will thank you for not giving up today.",
        "Every rep counts. You're literally building a stronger version of yourself!"
      ]
    };

    const message = userMessage.toLowerCase();
    if (message.includes('workout') || message.includes('exercise') || message.includes('training')) {
      return responses.workout[Math.floor(Math.random() * responses.workout.length)];
    } else if (message.includes('nutrition') || message.includes('diet') || message.includes('food') || message.includes('protein')) {
      return responses.nutrition[Math.floor(Math.random() * responses.nutrition.length)];
    } else if (message.includes('form') || message.includes('technique') || message.includes('posture')) {
      return responses.form[Math.floor(Math.random() * responses.form.length)];
    } else if (message.includes('motivation') || message.includes('tired') || message.includes('give up') || message.includes('hard')) {
      return responses.motivation[Math.floor(Math.random() * responses.motivation.length)];
    } else {
      return "That's a great question! I can help you with workout planning, nutrition advice, form corrections, and motivation. What specific area would you like to focus on today?";
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleChatOpen = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
    setPulseAnimation(false);
  };

  return (
    <>
      {/* Enhanced Chat Toggle Button with Marketing */}
      <div className="fixed bottom-6 right-6 z-[9998]">
        {/* Tooltip/Marketing Bubble */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-0 right-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-2xl w-72 transform animate-pulse hover:animate-none z-[9999]">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="font-semibold text-sm">AI Trainer Available!</span>
            </div>
            <p className="text-xs">
              Get instant answers about workouts, nutrition, and form tips! 
            </p>
            <div className="absolute top-1/2 -right-2 w-0 h-0 border-l-8 border-t-4 border-b-4 border-l-blue-600 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
          </div>
        )}

        {/* Main Chat Button */}
        <button
          onClick={handleChatOpen}
          className={`
            relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
            text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110
            ${pulseAnimation ? 'animate-pulse' : ''}
          `}
        >
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-ping opacity-75"></div>
          
          {/* Icon Container */}
          <div className="relative flex items-center justify-center">
            <MessageCircle size={24} />
            
            {/* AI Badge */}
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <Zap size={10} />
              <span className="text-[10px] font-bold">AI</span>
            </div>
          </div>
        </button>

        {/* Quick Access Buttons */}
        {!isOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-2 transform transition-all duration-300">
            <button
              onClick={() => {
                setIsOpen(true);
                setInputMessage("Give me a quick workout tip");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-full whitespace-nowrap shadow-lg transform hover:scale-105 transition-all"
            >
              💪 Quick Tip
            </button>
            <button
              onClick={() => {
                setIsOpen(true);
                setInputMessage("How can I improve my form?");
              }}
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-full whitespace-nowrap shadow-lg transform hover:scale-105 transition-all"
            >
              🎯 Form Check
            </button>
            <button
              onClick={() => {
                setIsOpen(true);
                setInputMessage("I need some motivation");
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-2 rounded-full whitespace-nowrap shadow-lg transform hover:scale-105 transition-all"
            >
              🔥 Motivate Me
            </button>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl z-[9997] flex flex-col">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-t-lg flex items-center gap-2">
            <div className="relative">
              <Bot size={20} />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <span className="font-semibold">AI Personal Trainer</span>
              <div className="text-xs opacity-90">Online • Ready to help</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition-colors"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && <Bot size={16} className="mt-1 text-blue-400" />}
                    {message.type === 'user' && <User size={16} className="mt-1" />}
                    <span className="text-sm">{message.content}</span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-100 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot size={16} className="text-blue-400" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-600">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything about fitness..."
                className="flex-1 bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2 rounded transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 