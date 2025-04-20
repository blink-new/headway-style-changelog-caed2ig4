
export type ChangelogStatus = "new" | "fix" | "improve";
export type ChangelogCategory = "UI" | "Performance" | "API" | "Docs" | "Security";

export interface ChangelogUpdate {
  id: string;
  version: string;
  date: string; // ISO string
  status: ChangelogStatus;
  title: string;
  description: string;
  categories: ChangelogCategory[];
  reactions: { [emoji: string]: number };
}

export const initialUpdates: ChangelogUpdate[] = [
  {
    id: "1",
    version: "v1.2.0",
    date: "2024-06-01",
    status: "new",
    title: "Dark Mode Support",
    description: "Added full dark mode support for all pages. Your eyes will thank you at night!",
    categories: ["UI"],
    reactions: { "👍": 3, "🎉": 2, "❤️": 1 }
  },
  {
    id: "2",
    version: "v1.1.0",
    date: "2024-05-20",
    status: "improve",
    title: "Faster API Responses",
    description: "Optimized backend queries for a snappier experience.",
    categories: ["Performance", "API"],
    reactions: { "🚀": 4, "👍": 2 }
  },
  {
    id: "3",
    version: "v1.0.1",
    date: "2024-05-10",
    status: "fix",
    title: "Login Bug Squashed",
    description: "Fixed an issue where some users could not log in after password reset.",
    categories: ["Security"],
    reactions: { "🐛": 2, "🙏": 1 }
  }
];