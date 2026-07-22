export interface Project {
  title: string;
  description: string;
  /** Human date, e.g. "April 2025". */
  date: string;
  tags: string[];
  github?: string;
  preview?: string;
  /** When true, surfaces on the homepage Featured projects section. */
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Dev Life (This web site)",
    description:
      "Level up your DevOps, Cloud, and security skills. Learn how to automate deployments, manage and monitor containerized apps.",
    date: "December 2022",
    tags: ["nuxt3", "nuxt-content", "vercel"],
    github: "https://github.com/denisakp/denisakp.github.io",
  },
  {
    title: "Ogoune",
    description:
      "An open-source monitoring tool for SSL certificates, domain expirations, TCP services, and cronjobs — with alerting and status pages.",
    date: "April 2025",
    tags: ["golang", "Vue3", "monitoring"],
    github: "https://github.com/denisakp/ogoune",
  },
  {
    title: "Obscura",
    description:
      "A client-side password generator built with Vue 3 and Vite. It allows users to create strong, customizable passwords based on best security practices.",
    date: "April 2025",
    tags: ["TypeScript", "Vue3", "security"],
    github: "https://github.com/denisakp/obscura",
    preview: "https://obscura.denisakp.me",
    featured: true,
  },
  {
    title: "Sentinel",
    description:
      "Sentinel is an open-source backup and restoration tool designed for seamless management of PostgreSQL, MySQL, and MongoDB databases, in Docker, Kubernetes, and local environments",
    date: "September 2024",
    tags: ["golang", "kubernetes", "docker", "database"],
    github: "https://github.com/denisakp/sentinel",
    featured: true,
  },
  {
    title: "Expressjs MongoDB Docker",
    description:
      "This project demonstrates how to integrate Express.js, with MongoDB database, all containerized with Docker.",
    date: "April 2024",
    tags: ["node.js", "mongo", "docker"],
    github: "https://github.com/denisakp/expressjs-mongo-docker",
  },
  {
    title: "Quotes Scraping Tool",
    description:
      "An open-source project designed to introduce enthusiasts to the world of open source participation.",
    date: "April 2024",
    tags: ["python", "scraping", "open-source"],
    github: "https://github.com/blablageeks/quotes-scraping-tool",
  },
  {
    title: "Canal Olympia",
    description:
      "This project is intended to scrape data from the Canal Olympia official site and provides JSON-formatted data.",
    date: "October 2023",
    tags: ["python", "scraping", "open-source"],
    github: "https://github.com/denisakp/canal-olympia-scrapper",
    preview: "https://denisakp.github.io/canal-olympia-scrapper/",
  }
];

export default projects;
