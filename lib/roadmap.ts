/**
 * Single source of truth for the site's roadmap structure — transcribed from
 * content/outline.md's "How to read this guide" table and its 14 section
 * headings. Used by RoadmapStepper (the persistent progress rail) and by
 * Header (to decide which top-nav item is current).
 */

export type NavGroup = "reference" | "example";

export interface RoadmapSection {
  id: number;
  title: string;
  slug: string;
  navGroup: NavGroup;
}

export interface RoadmapStage {
  id: string;
  label: string;
  sectionIds: number[];
}

export const sections: RoadmapSection[] = [
  { id: 1, title: "Quickstart", slug: "", navGroup: "reference" },
  { id: 2, title: "Mental Model", slug: "mental-model", navGroup: "reference" },
  { id: 3, title: "Global CLAUDE.md", slug: "claude-md-global", navGroup: "reference" },
  { id: 4, title: "Project CLAUDE.md", slug: "claude-md-project", navGroup: "reference" },
  { id: 5, title: "CLAUDE.local.md", slug: "claude-md-local", navGroup: "reference" },
  { id: 6, title: "Nested CLAUDE.md", slug: "claude-md-nested", navGroup: "reference" },
  { id: 7, title: "Skills", slug: "skills", navGroup: "reference" },
  { id: 8, title: "Subagents", slug: "subagents", navGroup: "reference" },
  { id: 9, title: "MCP Servers", slug: "mcp-servers", navGroup: "reference" },
  { id: 10, title: "Plan Mode & Terminal", slug: "plan-mode-and-terminal", navGroup: "reference" },
  { id: 11, title: "Token Usage & Context", slug: "token-usage", navGroup: "reference" },
  { id: 12, title: "Do's and Don'ts Checklist", slug: "dos-and-donts", navGroup: "reference" },
  { id: 13, title: "Research Stages End-to-End", slug: "worked-example-research", navGroup: "example" },
  { id: 14, title: "Personal Usage", slug: "worked-example-personal", navGroup: "example" },
];

export const stages: RoadmapStage[] = [
  { id: "start-here", label: "Start here", sectionIds: [1] },
  { id: "understand-the-model", label: "Understand the model", sectionIds: [2] },
  { id: "build-your-memory-system", label: "Build your memory system", sectionIds: [3, 4, 5, 6] },
  { id: "extend-what-claude-can-do", label: "Extend what Claude can do", sectionIds: [7, 8, 9] },
  { id: "work-efficiently", label: "Work efficiently", sectionIds: [10, 11, 12] },
  { id: "see-it-all-together", label: "See it all together", sectionIds: [13, 14] },
];

export const templatesSlug = "templates";

export function sectionBySlug(slug: string): RoadmapSection | undefined {
  return sections.find((section) => section.slug === slug);
}

export function stageForSection(sectionId: number): RoadmapStage | undefined {
  return stages.find((stage) => stage.sectionIds.includes(sectionId));
}

export function nextSection(sectionId: number): RoadmapSection | undefined {
  return sections.find((section) => section.id === sectionId + 1);
}
