import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import heroImage from "@assets/ai  app_1764418714241.jpg";

export default function Welcome() {
  return (
    <div className="container mx-auto px-4 flex-grow flex items-center py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
        {/* Text Content */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Understanding Your Child <span className="text-primary">Better</span>
            </h1>
            
            <div className="prose prose-lg text-muted-foreground">
              <p className="text-lg">
                Hi there! 👋
              </p>
              <p>
                Thanks so much for taking the time to understand your child better. We know being a parent isn't easy—a lot of love, patience, and effort go into it. You're doing something amazing by taking this step.
              </p>
            </div>

            <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-foreground text-lg">Today's assessment will help us:</h3>
              <ul className="space-y-3">
                {[
                  "Identify your child's behavioral patterns",
                  "Understand health and nutrition concerns",
                  "Provide personalized guidance tailored to your child's needs"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-4">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8 py-6 h-auto rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground font-medium px-2">
              ⏱️ Takes only 5-7 minutes
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="order-1 lg:order-2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-[2rem] transform rotate-3 scale-105 blur-xl opacity-60 pointer-events-none" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-square lg:aspect-auto lg:h-[600px]">
            <img 
              src={heroImage} 
              alt="Parent and child reading together" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
