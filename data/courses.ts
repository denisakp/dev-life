export type CourseMaterialType =
  | "syllabus"
  | "lecture"
  | "td"
  | "lab"
  | "project"
  | "exam";

export interface CourseMaterial {
  /** Material category — drives badge color and label. */
  type: CourseMaterialType;
  /** Short title shown to students. */
  title: string;
  /** Absolute URL: Google Drive (PDF, slides), GitHub repo, or self-hosted PDF. */
  url: string;
  /** Optional ISO YYYY-MM-DD — session date or publication date. */
  date?: string;
  /** Optional 1-line description. */
  description?: string;
}

export interface Course {
  /** URL-safe identifier. */
  slug: string;
  /** Full course title (display). */
  title: string;
  /** 1-2 sentence summary. */
  description: string;
  /** Schools / universities where this course was taught. */
  schools?: string[];
  /** e.g. "2025-S1". */
  semester?: string;
  /** e.g. "Licence 3", "Master 1". */
  level?: string;
  /** Primary language of the course materials. */
  language: "fr" | "en";
  /** Ordered list of materials (lectures, TDs, TPs, etc.). */
  materials: CourseMaterial[];
}

const courses: Course[] = [
  {
    slug: "distributed-programming-java",
    title: "Programmation distribuée avec Java",
    description:
      "Sockets TCP/UDP, RMI, multithreading, synchronisation, concurrence, premiers pas en systèmes distribués.",
    semester: "2026-S7",
    language: "fr",
    materials: [
      // Replace url:"" with real Google Drive / GitHub links.
      // { type: "syllabus", title: "Plan du cours", url: "" },
      // { type: "lecture",  title: "CM 1 — Intro aux systèmes distribués", url: "" },
      // { type: "td",       title: "TD 1 — Premiers échanges", url: "" },
      // { type: "lab",      title: "TP 1 — Client/serveur TCP", url: "" },
    ],
  },
  {
    slug: "gis-ml-modeling",
    title: "SIG & modélisation Machine Learning",
    description:
      "Systèmes d'information géographique, données spatiales, modélisation prédictive appliquée à la géomatique.",
    semester: "2026-S8",
    language: "fr",
    materials: [],
  },
  {
    slug: "database-fundamentals",
    title: "Fondamentaux de base de données",
    description:
      "Modèle relationnel, algèbre relationnelle, normalisation, SQL, transactions, ACID.",
    semester: "2025-S3",
    language: "fr",
    materials: [],
  },
  {
    slug: "intro-dbms",
    title: "Introduction aux SGBD",
    description:
      "Architecture des SGBD, stockage, index, optimiseur de requêtes, gestion des transactions et reprise après panne.",
    semester: "2025-S3",
    language: "fr",
    materials: [],
  },
];

export default courses;
