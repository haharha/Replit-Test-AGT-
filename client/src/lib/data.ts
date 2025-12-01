import { z } from "zod";
import educationalCover from "@assets/generated_images/abstract_educational_book_cover_design.png";
import emotionalCover from "@assets/generated_images/abstract_emotional_intelligence_book_cover_design.png";
import healthCover from "@assets/generated_images/abstract_health_and_nutrition_book_cover_design.png";

// Import PDFs
import academicPdf from "@assets/[by agtgenetics] Unlock 9 Hidden Talents Academic Learning by agtgenetics (1)_1764417982219.pdf";
import masteringEqPdf from "@assets/[by agtgenetics] Mastering The 5 Components to Raise Emotionally Intelligent Child for Your Child Success_1764417982217.pdf";
import preventingDiabetesPdf from "@assets/[by Agtgenetics X Diet Ideas] A Guide to Building a Healthier Future for Your Family_ Preventing and Reversing Diabetes_1764417982207.pdf";
import lonelinessPdf from "@assets/[by agtgenetics] Loneliness in Children_1764417982215.pdf";
import fiveSkillsPdf from "@assets/[by agtgenetics] 5 essential skills to raise future-ready kids in the age of AI (1)_1764417982207.pdf";
import lowFocusPdf from "@assets/[by agtgenetics] Low Focus due to Poor Working Memory vs Low Focus due to ADHD _1764417982216.pdf";
import artisticPdf from "@assets/[by agtgenetics] Unloack 9 Hidden Talents Artistic Potential by AGTgenetics_1764417982218.pdf";
import artPromptsPdf from "@assets/[by agtgenetics] 20 Gentle Art Prompts to Grow Emotional Intelligence by agtgenetics (1)_1764417982208.pdf";
import brainDevPdf from "@assets/[by agtgenetics] Brain Development Stages What to Nurture at Every Age_1764417982210.pdf";
import newbornPdf from "@assets/[by agtgenetics] From Newborn to One Your First Year with Your Baby_1764417982212.pdf";
import parentingProPdf from "@assets/[by agtgenetics] Parenting Like A Pro A starter  guide to parenting without fear_1764417982218.pdf";
import hyperthymicPdf from "@assets/[by agtgenetics] Hyperthymic Temperament_1764417982214.pdf";

// --- Types ---

export type Section = "A" | "B";

export interface Question {
  id: number;
  text: string;
  section: Section;
}

export interface PdfResource {
  id: string;
  title: string;
  subtitle: string;
  category: "Academic" | "Emotional" | "Health" | "Talent";
  description: string;
  filename: string;
  fileUrl: string;
  coverImage: string;
}

export const contactSchema = z.object({
  parentName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  childAge: z.coerce.number().min(0).max(18),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

// --- Data ---

export const questions: Question[] = [
  // Section A: Child Development & Emotional Wellbeing
  { id: 1, text: "My child loses interest easily / tends to give up quickly.", section: "A" },
  { id: 2, text: "I don't know what learning method suits my child best.", section: "A" },
  { id: 3, text: "My child struggles to engage with others.", section: "A" },
  { id: 4, text: "My child's emotions (anger, frustration, resilience) can be intense at times. Managing them is challenging.", section: "A" },
  { id: 5, text: "My child has difficulty focusing on tasks.", section: "A" },
  { id: 6, text: "My child doesn't share much with me, and I often wonder what's going on in his/her mind.", section: "A" },
  { id: 7, text: "My child doesn't know what course to study or which career path to pursue.", section: "A" },
  { id: 8, text: "My child is only interested in playing games and shows little interest in other activities.", section: "A" },
  { id: 9, text: "My child is having difficulty keeping up with school lessons and understanding certain subjects.", section: "A" },
  
  // Section B: Child Wellness & Nutrition Risk
  { id: 10, text: "Some health conditions seem to run in my family, and I worry my children might carry similar risks.", section: "B" },
  { id: 11, text: "My child loves sweets, and I'm concerned this could lead to obesity or diabetes.", section: "B" },
  { id: 12, text: "My child is smaller than other children of the same age. I'm concerned about their nutrition.", section: "B" },
  { id: 13, text: "My child can be low in energy and falls sick easily. I worry about missing nutrients.", section: "B" },
  { id: 14, text: "My child is a picky eater, and I want to ensure they get essential nutrients.", section: "B" },
];

export const pdfs: PdfResource[] = [
  {
    id: "academic-learning",
    title: "Unlock 9 Hidden Talents: Academic Learning",
    subtitle: "Uncover Why Your Child Hates School, Gives Up Easily & Avoids Homework",
    category: "Academic",
    description: "Discover the 3 hidden reasons behind academic struggles—it's not about IQ or laziness. Learn how to nurture critical thinking.",
    filename: "academic-learning.pdf",
    fileUrl: academicPdf,
    coverImage: educationalCover
  },
  {
    id: "mastering-eq",
    title: "Mastering The 5 Components to Raise Emotionally Intelligent Child",
    subtitle: "For Your Child's Success",
    category: "Emotional",
    description: "Master the 5 pillars of Emotional Intelligence: Self-Awareness, Self-Regulation, Motivation, Empathy, and Social Skills.",
    filename: "mastering-eq.pdf",
    fileUrl: masteringEqPdf,
    coverImage: emotionalCover
  },
  {
    id: "preventing-diabetes",
    title: "A Guide to Preventing and Reversing Diabetes",
    subtitle: "What Doctors Won't Tell You",
    category: "Health",
    description: "Understand genetic predisposition to diabetes, learn how DNA testing reveals risks before symptoms.",
    filename: "preventing-diabetes.pdf",
    fileUrl: preventingDiabetesPdf,
    coverImage: healthCover
  },
  {
    id: "loneliness-children",
    title: "Loneliness in Children",
    subtitle: "Understanding Social Struggles",
    category: "Emotional",
    description: "Learn how genetics influence loneliness, recognize warning signs, and discover practical strategies.",
    filename: "loneliness-children.pdf",
    fileUrl: lonelinessPdf,
    coverImage: emotionalCover
  },
  {
    id: "5-essential-skills",
    title: "5 Essential Skills to Raise Future-Ready Kids in the Age of AI",
    subtitle: "Novelty-Seeking, Collaboration, Adaptability",
    category: "Academic",
    description: "Prepare your child for the future with 5 critical skills. Includes home activities to nurture curiosity.",
    filename: "5-essential-skills.pdf",
    fileUrl: fiveSkillsPdf,
    coverImage: educationalCover
  },
  {
    id: "low-focus",
    title: "Low Focus due to Poor Working Memory vs Low Focus due to ADHD",
    subtitle: "Understanding the Difference",
    category: "Academic",
    description: "Not all focus issues are ADHD. Learn the differences between poor working memory and ADHD.",
    filename: "low-focus.pdf",
    fileUrl: lowFocusPdf,
    coverImage: educationalCover
  },
  {
    id: "artistic-potential",
    title: "Unlock 9 Hidden Talents: Artistic Potential",
    subtitle: "Bonus: 20 Gentle Art Prompts",
    category: "Talent",
    description: "Discover how artistic potential is influenced by genetics and how art supports cognitive development.",
    filename: "artistic-potential.pdf",
    fileUrl: artisticPdf,
    coverImage: educationalCover
  },
  {
    id: "20-art-prompts",
    title: "20 Gentle Art Prompts to Grow Emotional Intelligence",
    subtitle: "Creative Activities for Children",
    category: "Emotional",
    description: "Print-and-use art prompts designed to help children explore feelings, imagination, and self-expression.",
    filename: "20-art-prompts.pdf",
    fileUrl: artPromptsPdf,
    coverImage: emotionalCover
  },
  {
    id: "brain-development",
    title: "Brain Development Stages: What to Nurture at Every Age",
    subtitle: "Age-Appropriate Activities Guide",
    category: "Academic",
    description: "Understand the 4 stages of brain development (0-2, 2-5, 6-12, teens) with specific activities.",
    filename: "brain-development.pdf",
    fileUrl: brainDevPdf,
    coverImage: educationalCover
  },
  {
    id: "newborn-to-one",
    title: "From Newborn to One: Your First Year with Baby",
    subtitle: "Milestones, Activities & Emotional Wellbeing",
    category: "Health",
    description: "Support your baby's first year with milestone tracking, brain-boosting activities, and guidance.",
    filename: "newborn-to-one.pdf",
    fileUrl: newbornPdf,
    coverImage: healthCover
  },
  {
    id: "parenting-pro",
    title: "Parenting Like a Pro: A Starter Guide",
    subtitle: "Breaking Free from Helicopter Parenting",
    category: "Emotional",
    description: "Recognize helicopter parenting patterns and learn how to give your child the right support.",
    filename: "parenting-pro.pdf",
    fileUrl: parentingProPdf,
    coverImage: emotionalCover
  },
  {
    id: "hyperthymic",
    title: "Hyperthymic Temperament",
    subtitle: "Understanding High-Energy Children",
    category: "Emotional",
    description: "Learn about hyperthymic temperament—high energy, enthusiasm, and optimism.",
    filename: "hyperthymic.pdf",
    fileUrl: hyperthymicPdf,
    coverImage: emotionalCover
  }
];

export const concernToPdfMap: Record<number, string[]> = {
  1: ["academic-learning", "5-essential-skills", "mastering-eq"],
  2: ["academic-learning", "brain-development", "artistic-potential"],
  3: ["loneliness-children", "mastering-eq"],
  4: ["mastering-eq", "hyperthymic"],
  5: ["academic-learning", "low-focus"],
  6: ["loneliness-children", "20-art-prompts"],
  7: ["brain-development", "5-essential-skills"],
  8: ["parenting-pro", "brain-development"],
  9: ["academic-learning", "low-focus"],
  10: ["preventing-diabetes", "brain-development"],
  11: ["preventing-diabetes"],
  12: ["brain-development", "newborn-to-one"],
  13: ["brain-development", "preventing-diabetes"],
  14: ["brain-development", "newborn-to-one"]
};
