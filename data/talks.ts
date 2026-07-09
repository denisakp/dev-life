export interface Talk {
  /** Session format. Omitted = "talk". */
  type?: "talk" | "workshop";
  /** Short presentation title. */
  title: string;
  /** Conference, meetup, podcast, or other venue name. */
  venue: string;
  /** ISO YYYY-MM-DD. Used for lexicographic sort. */
  date: string;
  /** Optional public slides URL. */
  slidesUrl?: string;
  /** Optional video recording URL. */
  recordingUrl?: string;
  /** Optional code / materials repo URL (handy for workshops). */
  repoUrl?: string;
  /** Optional 1-2 sentence summary. */
  description?: string;
}

const talks: Talk[] = [
  {
    title:
      "Le diplôme ne suffit plus : Repenser la formation Tech au Togo pour des carrières qui durent",
    venue: "Synca Conf, Togo",
    date: "2026-05-16",
    slidesUrl:
      "https://docs.google.com/presentation/d/19rFV6sjikGxq_8jNo2BSkiJwyUmaR7sK7b21xQ6Vens/edit?usp=sharing",
    description:
      "Why a tech diploma is no longer enough, and how training in Togo can be rethought for careers that last.",
  },
  {
    title: "Ingénierie de la fiabilité avec Python",
    venue: "PyCon Togo 2025",
    date: "2025-08-23",
    slidesUrl:
      "https://docs.google.com/presentation/d/1BCRM8jWi_FB5kzmbDMRgPJCz3RidXV2Bpb3cw7SKOdo/edit?usp=sharing",
    recordingUrl: "https://youtu.be/q4igrdEZ8Uk?si=CGtdWS7N6gqjoD-n",
    description:
      "Site Reliability Engineering practices and tooling for Python services.",
  },
  {
    title:
      "Implementing Modern Authorization in your Applications with ReBAC",
    venue: "CNCF Dakar",
    date: "2026-01-10",
    slidesUrl:
      "https://docs.google.com/presentation/d/1JtdtDnONUFBIt1WLyLRiDa4XHuvsd9BYxYBtnsSOask/edit?usp=sharing",
    recordingUrl: "https://youtu.be/S3t30ykpjgE?si=RzntmYsIx7rQYt1y",
    description:
      "Building fine-grained, relationship-based authorization (ReBAC) with OpenFGA into modern apps.",
  },
  {
    title: "How I passed the KCNA Exam — Tips & Insights",
    venue: "Andela",
    date: "2025-05-20",
    slidesUrl:
      "https://docs.google.com/presentation/d/1THgMZ-CQk6KVfRLrc-IjYbTkaTJ76zq1PbSlW_XtzVI/edit?usp=sharing",
    description:
      "Preparation strategy, exam structure, and the resources that worked when sitting the Kubernetes & Cloud Native Associate (KCNA) exam.",
  },
];

export default talks;
