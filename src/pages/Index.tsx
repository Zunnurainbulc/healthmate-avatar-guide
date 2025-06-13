
import { useState } from "react";
import { VirtualAssistant } from "@/components/VirtualAssistant";
import { HumanBodyModel } from "@/components/HumanBodyModel";
import { SymptomAnalysis } from "@/components/SymptomAnalysis";
import { VoiceInput } from "@/components/VoiceInput";
import { Header } from "@/components/Header";
import { toast } from "sonner";

const Index = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomAdd = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      console.log("Added symptom:", symptom);
    }
  };

  const handleBodyPartSelect = (bodyPart: string) => {
    if (selectedBodyParts.includes(bodyPart)) {
      setSelectedBodyParts(selectedBodyParts.filter(part => part !== bodyPart));
    } else {
      setSelectedBodyParts([...selectedBodyParts, bodyPart]);
    }
    console.log("Selected body parts:", selectedBodyParts);
  };

  const handleAnalyze = async () => {
    if (symptoms.length === 0 && selectedBodyParts.length === 0) {
      toast("Please describe your symptoms or select affected body parts");
      return;
    }
    
    setIsAnalyzing(true);
    console.log("Starting analysis with symptoms:", symptoms, "and body parts:", selectedBodyParts);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysisResult = generateAnalysis(symptoms, selectedBodyParts);
      setAnalysis(analysisResult);
      setIsAnalyzing(false);
      toast("Analysis complete");
    }, 2000);
  };

  const generateAnalysis = (symptoms: string[], bodyParts: string[]): string => {
    // Simple analysis simulation
    const commonConditions = [
      "Upper respiratory infection",
      "Muscle strain",
      "Tension headache",
      "Allergic reaction",
      "Viral infection"
    ];
    
    const randomCondition = commonConditions[Math.floor(Math.random() * commonConditions.length)];
    
    return `Based on your symptoms${symptoms.length > 0 ? ` (${symptoms.join(", ")})` : ""} and affected areas${bodyParts.length > 0 ? ` (${bodyParts.join(", ")})` : ""}, you may be experiencing ${randomCondition}. 

**Recommendations:**
- Rest and stay hydrated
- Monitor symptoms for 24-48 hours
- Consider over-the-counter remedies if appropriate
- Consult a healthcare provider if symptoms worsen

**⚠️ Disclaimer:** This is a preliminary assessment only. Please consult with a qualified healthcare professional for proper diagnosis and treatment.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            HealthMateXR Virtual Symptom Checker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms using chat or voice, visualize them on our 3D body model, 
            and receive AI-powered preliminary health insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <VirtualAssistant
              onSymptomAdd={handleSymptomAdd}
              symptoms={symptoms}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
            
            <VoiceInput onSymptomAdd={handleSymptomAdd} />
          </div>

          <div className="lg:col-span-1">
            <HumanBodyModel
              selectedParts={selectedBodyParts}
              onPartSelect={handleBodyPartSelect}
            />
          </div>

          <div className="lg:col-span-1">
            <SymptomAnalysis
              analysis={analysis}
              symptoms={symptoms}
              selectedBodyParts={selectedBodyParts}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
