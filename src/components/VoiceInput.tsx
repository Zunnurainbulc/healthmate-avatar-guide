
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume } from "lucide-react";
import { toast } from "sonner";

interface VoiceInputProps {
  onSymptomAdd: (symptom: string) => void;
}

export const VoiceInput = ({ onSymptomAdd }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast("Speech recognition is not supported in your browser");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast("Listening... Please describe your symptoms");
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
        // Extract symptoms from speech
        const symptoms = extractSymptoms(finalTranscript);
        symptoms.forEach(symptom => onSymptomAdd(symptom));
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast("Error with speech recognition. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Volume className="h-5 w-5 text-green-600" />
          <span>Voice Input</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className={`w-full ${
              isListening 
                ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="h-5 w-5 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="h-5 w-5 mr-2" />
                Start Voice Input
              </>
            )}
          </Button>
        </div>

        {transcript && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">You said:</p>
            <p className="text-sm text-gray-600">{transcript}</p>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center">
          <p>Click the microphone button and describe your symptoms clearly.</p>
          <p>The system will automatically detect and categorize them.</p>
        </div>
      </CardContent>
    </Card>
  );
};
