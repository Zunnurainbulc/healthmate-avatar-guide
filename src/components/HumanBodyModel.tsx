
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, RotateCcw } from "lucide-react";

interface HumanBodyModelProps {
  selectedParts: string[];
  onPartSelect: (bodyPart: string) => void;
}

export const HumanBodyModel = ({ selectedParts, onPartSelect }: HumanBodyModelProps) => {
  const [viewMode, setViewMode] = useState<"front" | "back">("front");

  const bodyParts = {
    front: [
      { id: "head", name: "Head", x: 50, y: 10 },
      { id: "neck", name: "Neck", x: 50, y: 18 },
      { id: "chest", name: "Chest", x: 50, y: 28 },
      { id: "stomach", name: "Stomach", x: 50, y: 40 },
      { id: "left-arm", name: "Left Arm", x: 25, y: 32 },
      { id: "right-arm", name: "Right Arm", x: 75, y: 32 },
      { id: "left-leg", name: "Left Leg", x: 42, y: 65 },
      { id: "right-leg", name: "Right Leg", x: 58, y: 65 },
    ],
    back: [
      { id: "head-back", name: "Head (Back)", x: 50, y: 10 },
      { id: "neck-back", name: "Neck (Back)", x: 50, y: 18 },
      { id: "upper-back", name: "Upper Back", x: 50, y: 28 },
      { id: "lower-back", name: "Lower Back", x: 50, y: 40 },
      { id: "left-arm-back", name: "Left Arm (Back)", x: 25, y: 32 },
      { id: "right-arm-back", name: "Right Arm (Back)", x: 75, y: 32 },
      { id: "left-leg-back", name: "Left Leg (Back)", x: 42, y: 65 },
      { id: "right-leg-back", name: "Right Leg (Back)", x: 58, y: 65 },
    ]
  };

  const isSelected = (bodyPartId: string) => selectedParts.includes(bodyPartId);

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <span>Body Map</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "front" ? "back" : "front")}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            {viewMode === "front" ? "Back" : "Front"}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 relative bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              Click on body parts where you feel symptoms
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Current view: {viewMode === "front" ? "Front" : "Back"}
            </p>
          </div>
          
          {/* Simple body representation */}
          <div className="relative w-full h-64 mx-auto">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ maxWidth: "200px", margin: "0 auto" }}
            >
              {/* Body outline */}
              <ellipse cx="50" cy="12" rx="8" ry="10" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
              <rect x="42" y="20" width="16" height="25" rx="3" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
              <rect x="44" y="45" width="12" height="20" rx="2" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
              <rect x="15" y="25" width="8" height="20" rx="3" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
              <rect x="77" y="25" width="8" height="20" rx="3" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
              <rect x="40" y="65" width="6" height="25" rx="2" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
              <rect x="54" y="65" width="6" height="25" rx="2" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
              
              {/* Interactive body parts */}
              {bodyParts[viewMode].map((part) => (
                <circle
                  key={part.id}
                  cx={part.x}
                  cy={part.y}
                  r="6"
                  fill={isSelected(part.id) ? "#ef4444" : "#3b82f6"}
                  className="cursor-pointer transition-all duration-200 hover:fill-blue-700"
                  onClick={() => onPartSelect(part.id)}
                  opacity={isSelected(part.id) ? 0.8 : 0.6}
                />
              ))}
            </svg>
          </div>
          
          {/* Selected parts display */}
          {selectedParts.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Areas:</p>
              <div className="flex flex-wrap gap-1">
                {selectedParts.map((partId) => {
                  const part = [...bodyParts.front, ...bodyParts.back].find(p => p.id === partId);
                  return (
                    <span
                      key={partId}
                      className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded cursor-pointer hover:bg-red-200"
                      onClick={() => onPartSelect(partId)}
                    >
                      {part?.name} ✕
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
