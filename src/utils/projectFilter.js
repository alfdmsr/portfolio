export const PROJECT_CATEGORIES = [
  { id: "all", labelKey: "catAll" },
  { id: "llm", labelKey: "catLlm" },
  { id: "dl", labelKey: "catDl" },
  { id: "mlops", labelKey: "catMlops" },
  { id: "systems", labelKey: "catSystems" },
];

export function getProjectCategory(project) {
  const tags = project.tags.map((t) => t.toUpperCase());
  if (tags.some((t) => ["LLM", "RAG", "NLP", "SENTIMENT", "FINE-TUNE"].includes(t))) {
    return "llm";
  }
  if (
    tags.some((t) =>
      ["DEEP LEARNING", "COMPUTER VISION", "CNN", "TIME SERIES", "GEN AI", "DIFFUSION"].includes(t)
    )
  ) {
    return "dl";
  }
  if (tags.some((t) => ["MLOPS", "CI/CD", "CLUSTERING", "CLASSIFICATION", "ML"].includes(t))) {
    return "mlops";
  }
  return "systems";
}

export function matchesSearch(project, query, language) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const fields = [
    project.id,
    project.name[language],
    project.name.en,
    project.name.id,
    project.desc[language],
    project.status,
    ...project.tags,
    ...project.stack,
    project.metric.label,
    project.metric.value,
  ];
  return fields.some((field) => String(field).toLowerCase().includes(q));
}
