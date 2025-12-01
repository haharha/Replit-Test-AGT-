import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { pdfs, concernToPdfMap, type PdfResource } from "@/lib/data";
import { Download, ExternalLink, Calendar, Mail } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Results() {
  const [, setLocation] = useLocation();
  const [results, setResults] = useState<PdfResource[]>([]);
  const [userName, setUserName] = useState("Parent");

  useEffect(() => {
    const storedResults = localStorage.getItem("agt_assessment_results");
    const storedUser = localStorage.getItem("agt_user_data");

    if (!storedResults) {
      setLocation("/");
      return;
    }

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.parentName.split(" ")[0]); // First name
    }

    const ratings: Record<number, number> = JSON.parse(storedResults);

    // --- Algorithm Logic ---
    
    // 1. Identify concerns with High Severity (4 or 5)
    const highSeverityConcerns = Object.entries(ratings)
      .filter(([_, score]) => score >= 4)
      .map(([id]) => parseInt(id));

    // If no high severity, take score 3 as well to ensure recommendations
    const activeConcerns = highSeverityConcerns.length > 0 
      ? highSeverityConcerns 
      : Object.entries(ratings)
          .filter(([_, score]) => score >= 3)
          .map(([id]) => parseInt(id));

    // 2. Count PDF frequency
    const pdfScores: Record<string, number> = {};

    activeConcerns.forEach(concernId => {
      const linkedPdfs = concernToPdfMap[concernId] || [];
      // 3. Weight health concerns (10-14) 1.5x higher
      const weight = concernId >= 10 ? 1.5 : 1.0;

      linkedPdfs.forEach(pdfId => {
        pdfScores[pdfId] = (pdfScores[pdfId] || 0) + weight;
      });
    });

    // 4. Sort and pick Top 3
    const sortedPdfIds = Object.entries(pdfScores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([id]) => id)
      .slice(0, 3);

    // 5. Retrieve full PDF objects
    const recommendedPdfs = sortedPdfIds
      .map(id => pdfs.find(p => p.id === id))
      .filter((p): p is PdfResource => !!p);

    // Fallback if not enough recommendations (pick defaults)
    if (recommendedPdfs.length < 3) {
       const defaults = ["brain-development", "parenting-pro", "preventing-diabetes"];
       defaults.forEach(defId => {
         if (recommendedPdfs.length < 3 && !recommendedPdfs.find(p => p.id === defId)) {
           const pdf = pdfs.find(p => p.id === defId);
           if (pdf) recommendedPdfs.push(pdf);
         }
       });
    }

    setResults(recommendedPdfs);

    // Trigger celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3FA9F5', '#2E8BC0', '#F8F9FA']
    });

  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block text-4xl mb-4">🎉</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Personalized Guide is Ready, {userName}!
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Based on your responses, we've identified the top areas where your child needs support. 
            Below are our 3 recommended resources tailored specifically for your family.
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {results.map((pdf, index) => (
            <motion.div
              key={pdf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden group">
                  <img 
                    src={pdf.coverImage} 
                    alt={pdf.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                    {pdf.category}
                  </div>
                </div>
                <CardContent className="flex-grow p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground line-clamp-2 mb-2">{pdf.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{pdf.subtitle}</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {pdf.description}
                  </p>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700 italic">
                      <span className="font-semibold not-italic">Why recommended:</span> Based on your concerns, this guide will help you address specific challenges.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <a href={pdf.fileUrl} download={pdf.title + ".pdf"} className="w-full">
                    <Button className="w-full gap-2 shadow-md" size="lg">
                      <Download className="h-4 w-4" /> Download PDF
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Want More Support?</h2>
            <p className="text-muted-foreground">Take the next step in your parenting journey.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a 
              href="https://wa.me/60183687582?text=Hi%20AGT%20team%2C%20I%E2%80%99ve%20completed%20the%20parenting%20assessment%20shared%20by%20your%20team.%20Could%20you%20please%20tell%20me%20more%20about%20your%20Parenting%20PDF%20Library%3F%20I%E2%80%99m%20interested%20to%20learn%20more"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col"
            >
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 border-dashed border-2 w-full">
                <Download className="h-6 w-6 text-primary mb-1" />
                <span className="font-semibold">Download All Guides</span>
                <span className="text-xs text-muted-foreground font-normal">Get the full library (ZIP)</span>
              </Button>
            </a>
            
            <a 
              href="https://www.agtgenetics.com/how-it-works"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col"
            >
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 border-primary/20 hover:bg-primary/5 w-full">
                <ExternalLink className="h-6 w-6 text-primary mb-1" />
                <span className="font-semibold">Explore DNA Testing</span>
                <span className="text-xs text-muted-foreground font-normal">Scientific insights at AGT</span>
              </Button>
            </a>
            
            <a 
              href="https://wa.me/60183687582?text=Hi%20AGT%20team%2C%20I%E2%80%99ve%20completed%20the%20parenting%20assessment%20shared%20by%20your%20team.%20Could%20you%20please%20connect%20me%20with%20your%20consultants%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col"
            >
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 border-primary/20 hover:bg-primary/5 w-full">
                <Calendar className="h-6 w-6 text-primary mb-1" />
                <span className="font-semibold">Book Consultation</span>
                <span className="text-xs text-muted-foreground font-normal">Speak with an expert</span>
              </Button>
            </a>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto flex items-center gap-4 text-left border border-gray-200">
            <div className="bg-white p-3 rounded-full shadow-sm shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Check your inbox!</h4>
              <p className="text-sm text-muted-foreground">
                We've sent a copy of your results and download links to your email address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
