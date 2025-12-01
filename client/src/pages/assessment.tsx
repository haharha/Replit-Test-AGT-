import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { questions, type Section } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

export default function Assessment() {
  const [, setLocation] = useLocation();
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [activeSection, setActiveSection] = useState<Section>("A");

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(ratings).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const sectionQuestions = useMemo(() => {
    return questions.filter(q => q.section === activeSection);
  }, [activeSection]);

  const isSectionComplete = sectionQuestions.every(q => ratings[q.id]);
  const isAllComplete = answeredCount === totalQuestions;

  const handleRating = (questionId: number, rating: number) => {
    setRatings(prev => ({ ...prev, [questionId]: rating }));
  };

  const handleNext = () => {
    if (activeSection === "A") {
      setActiveSection("B");
      window.scrollTo(0, 0);
    } else {
      // Submit
      localStorage.setItem("agt_assessment_results", JSON.stringify(ratings));
      setLocation("/results");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Progress Bar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Assessment Progress</span>
            <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Rate Your Concerns</h1>
          <p className="text-muted-foreground">
            1 = Not at all  |  3 = Sometimes  |  5 = Very Often
          </p>
        </div>

        <Tabs value={activeSection} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-white border border-gray-200 rounded-full shadow-sm mb-8">
            <TabsTrigger 
              value="A" 
              onClick={() => setActiveSection("A")}
              className="rounded-full h-full data-[state=active]:bg-primary data-[state=active]:text-white text-base font-medium transition-all"
            >
              Development & Emotions
            </TabsTrigger>
            <TabsTrigger 
              value="B" 
              onClick={() => setActiveSection("B")}
              className="rounded-full h-full data-[state=active]:bg-primary data-[state=active]:text-white text-base font-medium transition-all"
            >
              Wellness & Nutrition
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {sectionQuestions.map((q) => (
                <Card 
                  key={q.id} 
                  className={cn(
                    "border-2 transition-all duration-300 overflow-hidden",
                    ratings[q.id] 
                      ? "border-primary/20 shadow-md bg-blue-50/30" 
                      : "border-transparent shadow-sm hover:shadow-md bg-white"
                  )}
                >
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg font-medium text-foreground mb-6 leading-relaxed">
                      {q.text}
                    </h3>
                    
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider hidden sm:block">Not at all</span>
                      <div className="flex justify-center gap-2 sm:gap-4 flex-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() => handleRating(q.id, value)}
                            className={cn(
                              "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-200",
                              ratings[q.id] === value
                                ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30"
                                : "bg-gray-100 text-gray-500 hover:bg-primary/20 hover:text-primary hover:scale-105"
                            )}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider hidden sm:block">Very Often</span>
                    </div>
                    
                    {/* Mobile Labels */}
                    <div className="flex justify-between sm:hidden mt-3 px-1">
                      <span className="text-[10px] text-muted-foreground font-medium uppercase">Not at all</span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase">Very Often</span>
                    </div>
                  </CardContent>
                  {ratings[q.id] && (
                    <div className="h-1 bg-primary w-full" />
                  )}
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between pt-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/contact")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!isSectionComplete}
            className="px-8 rounded-full shadow-lg shadow-primary/20"
          >
            {activeSection === "A" ? (
              <>Next Section <ChevronRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>Submit Assessment <Check className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
