import { useLocation, useNavigate } from "react-router-dom";
import { Check, AlertCircle, Clock, DollarSign, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VisaAnswer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  // If no data, redirect back to questions
  if (!formData) {
    navigate('/visa');
    return null;
  }

  // Generate visa requirements based on form data
  const generateRequirements = () => {
    const requirements = {
      documents: [
        "Valid passport (minimum 6 months validity from travel date)",
        "Completed visa application form (signed)",
        "Recent passport-size photographs (2 copies, white background)",
        "Proof of accommodation (hotel booking or invitation letter)",
        "Return flight ticket or detailed travel itinerary",
        "Bank statements (last 3-6 months)",
        "Travel insurance policy covering medical expenses",
      ],
      processingTime: "5-10 business days",
      fee: "$100 - $150 USD",
      validity: "90 days from issue date",
      additional: [],
      tips: [
        "Apply at least 2-3 weeks before your intended travel date",
        "Ensure all documents are in English or officially translated",
        "Keep copies of all submitted documents",
      ],
    };

    // Add purpose-specific requirements
    switch (formData.visitPurpose) {
      case "Business":
        requirements.additional.push("Business invitation letter from host company");
        requirements.additional.push("Company registration documents");
        requirements.additional.push("Chamber of Commerce certificate");
        break;
      case "Study":
        requirements.additional.push("Acceptance letter from educational institution");
        requirements.additional.push("Proof of tuition payment or scholarship letter");
        requirements.additional.push("Academic transcripts");
        break;
      case "Work":
        requirements.additional.push("Employment contract from hiring company");
        requirements.additional.push("Work permit approval from immigration authorities");
        requirements.additional.push("Professional qualifications certificates");
        requirements.processingTime = "15-30 business days";
        requirements.fee = "$200 - $300 USD";
        break;
      case "Medical":
        requirements.additional.push("Medical appointment confirmation");
        requirements.additional.push("Doctor's letter explaining treatment needed");
        requirements.additional.push("Proof of payment for medical services");
        break;
      case "Family Visit":
        requirements.additional.push("Invitation letter from family member");
        requirements.additional.push("Proof of relationship (birth certificate, marriage certificate)");
        requirements.additional.push("Host's residence proof and ID copy");
        break;
    }

    // Add duration-specific requirements
    if (formData.stayDuration === "More than 6 months") {
      requirements.additional.push("Medical examination certificate from approved clinic");
      requirements.additional.push("Police clearance certificate");
      requirements.additional.push("Proof of sufficient funds for extended stay");
      requirements.processingTime = "20-30 business days";
    }

    return requirements;
  };

  const visaInfo = generateRequirements();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Visa Requirements Found!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Here's what you need for your trip from <strong>{formData.fromCountry}</strong> to <strong>{formData.toCountry}</strong>
            </p>
          </div>

          {/* Travel Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Travel Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                  <p className="font-semibold">{formData.fromCountry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                  <p className="font-semibold">{formData.toCountry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nationality</p>
                  <p className="font-semibold">{formData.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Purpose</p>
                  <p className="font-semibold">{formData.visitPurpose}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-semibold">{formData.stayDuration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Processing Time</p>
                    <p className="font-semibold">{visaInfo.processingTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Visa Fee</p>
                    <p className="font-semibold">{visaInfo.fee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Validity</p>
                    <p className="font-semibold">{visaInfo.validity}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Required Documents */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                Required Documents
              </CardTitle>
              <CardDescription>Standard documents needed for all visa applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {visaInfo.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Additional Requirements */}
          {visaInfo.additional.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Additional Requirements
                </CardTitle>
                <CardDescription>
                  Specific to {formData.visitPurpose} visa{formData.stayDuration === "More than 6 months" ? " and long-term stay" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {visaInfo.additional.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Helpful Tips */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Helpful Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {visaInfo.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-orange-500">•</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Visa requirements may vary based on individual circumstances and can change without notice. 
              Always verify current requirements with the official embassy or consulate of {formData.toCountry} before applying.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate('/visa/questions')} 
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Check Another Country
            </Button>
            <Button 
              onClick={() => navigate('/contact')} 
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              Contact Us for Help
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VisaAnswer;
