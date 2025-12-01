import { subDays, format } from "date-fns";

export interface AdminAssessment {
  id: string;
  date: string;
  parentName: string;
  email: string;
  childAge: number;
  topIssue: string;
  status: "Completed" | "In Progress";
}

export const mockAssessments: AdminAssessment[] = [
  {
    id: "1",
    date: new Date().toISOString(),
    parentName: "Sarah Tan",
    email: "sarah.tan@example.com",
    childAge: 7,
    topIssue: "Focus",
    status: "Completed",
  },
  {
    id: "2",
    date: subDays(new Date(), 1).toISOString(),
    parentName: "Ahmad bin Ali",
    email: "ahmad.ali@example.com",
    childAge: 5,
    topIssue: "Emotions",
    status: "Completed",
  },
  {
    id: "3",
    date: subDays(new Date(), 2).toISOString(),
    parentName: "Jessica Wong",
    email: "jessica.w@example.com",
    childAge: 9,
    topIssue: "Social Skills",
    status: "Completed",
  },
  {
    id: "4",
    date: subDays(new Date(), 2).toISOString(),
    parentName: "Ravi Kumar",
    email: "ravi.k@example.com",
    childAge: 6,
    topIssue: "Nutrition",
    status: "Completed",
  },
  {
    id: "5",
    date: subDays(new Date(), 3).toISOString(),
    parentName: "Mei Ling",
    email: "mei.ling@example.com",
    childAge: 12,
    topIssue: "Academic",
    status: "Completed",
  },
  {
    id: "6",
    date: subDays(new Date(), 4).toISOString(),
    parentName: "John Doe",
    email: "john.doe@example.com",
    childAge: 8,
    topIssue: "Focus",
    status: "Completed",
  },
  {
    id: "7",
    date: subDays(new Date(), 5).toISOString(),
    parentName: "Siti Aminah",
    email: "siti.a@example.com",
    childAge: 4,
    topIssue: "Health",
    status: "Completed",
  },
  {
    id: "8",
    date: subDays(new Date(), 6).toISOString(),
    parentName: "David Teoh",
    email: "david.t@example.com",
    childAge: 10,
    topIssue: "Emotions",
    status: "Completed",
  },
];

export const severityData = [
  { name: "Focus", value: 45 },
  { name: "Emotions", value: 30 },
  { name: "Social", value: 15 },
  { name: "Health", value: 10 },
];

export const pdfData = [
  { name: "Academic Learning", value: 35, fill: "#3FA9F5" },
  { name: "Mastering EQ", value: 25, fill: "#2E8BC0" },
  { name: "Preventing Diabetes", value: 20, fill: "#4ADE80" },
  { name: "Brain Development", value: 15, fill: "#FACC15" },
  { name: "Other", value: 5, fill: "#94A3B8" },
];

export const timelineData = Array.from({ length: 7 }).map((_, i) => ({
  date: format(subDays(new Date(), 6 - i), "MMM dd"),
  assessments: Math.floor(Math.random() * 10) + 5,
}));
