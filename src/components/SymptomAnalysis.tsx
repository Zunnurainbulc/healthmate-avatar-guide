
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, FileText, Download, Map } from "lucide-react";
import { toast } from "sonner";

interface SymptomAnalysisProps {
  analysis: string;
  symptoms: string[];
  selectedBodyParts: string[];
  isAnalyzing: boolean;
}

export const SymptomAnalysis = ({ 
  analysis, 
  symptoms, 
  selectedBodyParts, 
  isAnalyzing 
}: SymptomAnalysisProps) => {
  
  const handleDownloadReport = () => {
    const reportContent = `
HEALTHMATEXR SYMPTOM REPORT
Generated: ${new Date().toLocaleString()}

SYMPTOMS REPORTED:
${symptoms.map(s => `• ${s}`).join('\n')}

AFFECTED BODY AREAS:
${selectedBodyParts.map(p => `• ${p}`).join('\n')}

PRELIMINARY ANALYSIS:
${analysis}

DISCLAIMER:
This report is for informational purposes only and does not constitute medical advice. 
Please consult with a qualified healthcare professional for proper diagnosis and treatment.
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healthmate-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast("Report downloaded successfully");
  };

  const handleFindClinics = () => {
    // Simulate finding nearby clinics
    toast("Opening clinic locator... (Feature coming soon)");
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-green-600" />
          <span>Analysis Results</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center h-32 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600">Analyzing your symptoms...</p>
          </div>
        ) : analysis ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-2">Preliminary Assessment</p>
                  <div className="text-blue-800 whitespace-pre-line">{analysis}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Summary:</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  {symptoms.length} Symptoms
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {selectedBodyParts.length} Areas
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleDownloadReport}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              
              <Button
                onClick={handleFindClinics}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Map className="h-4 w-4 mr-2" />
                Find Nearby Clinics
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 space-y-4 text-center">
            <FileText className="h-12 w-12 text-gray-300" />
            <div>
              <p className="text-sm font-medium text-gray-600">No Analysis Yet</p>
              <p className="text-xs text-gray-500 mt-1">
                Describe your symptoms and click "Get Analysis" to see results
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <AlertTriangle className="h-3 w-3" />
            <span>Always consult healthcare professionals for medical concerns</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
