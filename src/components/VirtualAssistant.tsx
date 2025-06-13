
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, User, Bot, Pill } from "lucide-react";

interface VirtualAssistantProps {
  onSymptomAdd: (symptom: string) => void;
  symptoms: string[];
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const VirtualAssistant = ({ onSymptomAdd, symptoms, onAnalyze, isAnalyzing }: VirtualAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your virtual health assistant. Please describe your symptoms or how you're feeling today. I'll help you identify what might be affecting you.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Extract potential symptoms from user input
    const symptoms = extractSymptoms(inputValue);
    symptoms.forEach(symptom => onSymptomAdd(symptom));

    // Generate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateResponse(inputValue, symptoms),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);

    setInputValue("");
  };

  const extractSymptoms = (text: string): string[] => {
    const symptomKeywords = [
      "headache", "fever", "cough", "sore throat", "fatigue", "nausea", 
      "dizziness", "chest pain", "stomach pain", "back pain", "joint pain",
      "runny nose", "congestion", "shortness of breath", "muscle aches"
    ];
    
    const foundSymptoms: string[] = [];
    const lowerText = text.toLowerCase();
    
    symptomKeywords.forEach(symptom => {
      if (lowerText.includes(symptom)) {
        foundSymptoms.push(symptom);
      }
    });
    
    return foundSymptoms;
  };

  const generateResponse = (userInput: string, extractedSymptoms: string[]): string => {
    if (extractedSymptoms.length > 0) {
      return `I've noted your symptoms: ${extractedSymptoms.join(", ")}. Can you tell me more about when these symptoms started and their severity? Also, feel free to click on the body model to show me exactly where you're experiencing discomfort.`;
    } else {
      return "I understand you're not feeling well. Could you be more specific about your symptoms? For example, do you have any pain, fever, or other discomfort? You can also use the 3D body model to show me where you're experiencing issues.";
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>Virtual Health Assistant</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "assistant" && (
                <div className="bg-blue-100 p-1 rounded-full">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
              )}
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </div>
              {message.type === "user" && (
                <div className="bg-gray-200 p-1 rounded-full">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {symptoms.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Identified Symptoms:</p>
            <div className="flex flex-wrap gap-1">
              {symptoms.map((symptom, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Pill className="h-3 w-3 mr-1" />
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your symptoms..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <Button 
          onClick={onAnalyze} 
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isAnalyzing || (symptoms.length === 0)}
        >
          {isAnalyzing ? "Analyzing..." : "Get Analysis"}
        </Button>
      </CardContent>
    </Card>
  );
};
