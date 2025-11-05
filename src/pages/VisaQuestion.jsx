import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, User, Calendar, Briefcase, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VisaQuestion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromCountry: "",
    toCountry: "",
    nationality: "",
    visitPurpose: "",
    stayDuration: "",
  });

  const countries = [
    "United States", "United Kingdom", "Germany", "France", "Spain", 
    "Italy", "China", "Japan", "Australia", "Canada", 
    "Uzbekistan", "Russia", "Turkey", "UAE", "Thailand",
    "South Korea", "India", "Brazil", "Mexico", "Netherlands"
  ];

  const purposes = [
    "Tourism", "Business", "Study", "Work", "Transit", "Medical", "Family Visit"
  ];

  const durations = [
    "Less than 15 days", "15-30 days", "1-3 months", "3-6 months", "More than 6 months"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Pass data to answer page via state
    navigate('/visa/answer', { state: formData });
  };

  const isStep1Complete = formData.fromCountry && formData.toCountry && formData.nationality;
  const isStep2Complete = formData.visitPurpose && formData.stayDuration;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Visa Requirements Checker</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Answer a few questions to find out what documents you need for your trip
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Step 1: Travel Details */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Travel Information</CardTitle>
                <CardDescription>Tell us about your travel plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fromCountry" className="flex items-center gap-2 text-base">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    Which country are you traveling from?
                  </Label>
                  <Select value={formData.fromCountry} onValueChange={(val) => handleInputChange("fromCountry", val)}>
                    <SelectTrigger id="fromCountry" className="h-12">
                      <SelectValue placeholder="Select your departure country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toCountry" className="flex items-center gap-2 text-base">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    Which country do you want to visit?
                  </Label>
                  <Select value={formData.toCountry} onValueChange={(val) => handleInputChange("toCountry", val)}>
                    <SelectTrigger id="toCountry" className="h-12">
                      <SelectValue placeholder="Select your destination country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality" className="flex items-center gap-2 text-base">
                    <User className="h-5 w-5 text-orange-500" />
                    What is your nationality?
                  </Label>
                  <Select value={formData.nationality} onValueChange={(val) => handleInputChange("nationality", val)}>
                    <SelectTrigger id="nationality" className="h-12">
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-lg"
                  disabled={!isStep1Complete}
                >
                  Continue <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Visit Details */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Visit Details</CardTitle>
                <CardDescription>Tell us more about your visit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="visitPurpose" className="flex items-center gap-2 text-base">
                    <Briefcase className="h-5 w-5 text-orange-500" />
                    What is the purpose of your visit?
                  </Label>
                  <Select value={formData.visitPurpose} onValueChange={(val) => handleInputChange("visitPurpose", val)}>
                    <SelectTrigger id="visitPurpose" className="h-12">
                      <SelectValue placeholder="Select visit purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stayDuration" className="flex items-center gap-2 text-base">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    How long do you plan to stay?
                  </Label>
                  <Select value={formData.stayDuration} onValueChange={(val) => handleInputChange("stayDuration", val)}>
                    <SelectTrigger id="stayDuration" className="h-12">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setStep(1)} 
                    variant="outline"
                    className="flex-1 h-12 text-lg"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-lg"
                    disabled={!isStep2Complete}
                  >
                    Get Requirements <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Note:</strong> This tool provides general guidance. Always verify requirements with the official embassy or consulate.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VisaQuestion;
