
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{
    id: number;
    text: string;
    sender: "user" | "agent";
    timestamp: Date;
  }[]>([
    {
      id: 1,
      text: "👋 Hi there! How can I help you with your data engineering needs today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: chatHistory.length + 1,
      text: message,
      sender: "user" as const,
      timestamp: new Date(),
    };
    
    setChatHistory([...chatHistory, userMessage]);
    setMessage("");

    // Simulate agent response after a short delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message! One of our data engineers will get back to you shortly.",
        "That's a great question about our data engineering services. Would you like to schedule a consultation?",
        "I understand you're interested in our data warehouse solutions. We have several options that might work for your needs.",
        "For technical questions about our ETL services, I'd be happy to connect you with one of our specialists.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const agentMessage = {
        id: chatHistory.length + 2,
        text: randomResponse,
        sender: "agent" as const,
        timestamp: new Date(),
      };
      
      setChatHistory(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl z-50 border-primary/20">
          <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-lg flex flex-row justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
                <AvatarFallback>DE</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">Data Engineer Support</h3>
                <p className="text-xs text-primary-foreground/80">Online | Typically responds in 5 minutes</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-4 h-80 overflow-y-auto flex flex-col gap-3">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          
          <CardFooter className="p-4 pt-2 border-t">
            <form
              className="flex w-full gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default LiveChat;
