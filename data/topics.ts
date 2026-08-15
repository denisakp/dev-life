const topics = [
  {
    title: "Data Structure",
    slug: "dsa",
    description:
      "Explore the fundamental building blocks of computer science through the study of algorithms and data structures, essential for designing efficient and optimized software solutions.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/thealgorithms/thealgorithms-original.svg",
  },
  {
    title: "Cloud",
    slug: "cloud",
    description:
      "Explore the cloud computing ecosystem articles, tutorials, and resources to help you get started with cloud computing.",
    iconPath: "/images/techs/cloud-computing.png",
  },
  {
    title: "IaC",
    slug: "iac",
    description:
      "Explore the Infrastructure as Code (IaC) ecosystem articles, tutorials, and resources to help you get started with IaC.",
    iconPath: "/images/techs/iac.png",
  },
  {
    title: "DevOps",
    slug: "devops",
    description:
      "Explore the DevOps ecosystem articles, tutorials, and resources to help you get started with DevOps.",
    iconPath: "/images/techs/devops.png",
  },
  {
    title: "Databases",
    slug: "databases",
    description:
      "Explore the databases ecosystem (MongoDB, PostgreSQL, Redis and more): replication, backups, clustering, performance tuning, and the patterns to run them reliably in production.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    title: "Docker",
    slug: "docker",
    description:
      "Explore Docker and containerization: multi-stage builds, Compose, image optimization, networking, and the patterns to ship containerized workloads with confidence.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    title: "Kubernetes",
    slug: "kubernetes",
    description:
      "Explore the Kubernetes ecosystem articles, tutorials, and resources to help you get started with Kubernetes.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    title: "Backend",
    slug: "backend",
    description:
      "Explore the backend ecosystem articles, tutorials, and resources to help you get started with backend development.",
    iconPath: "/images/techs/frameworks.png",
  },
  {
    title: "AI",
    slug: "ai",
    description:
      "Explore the AI and LLM infrastructure ecosystem: vector databases, RAG patterns, model gateways, observability for inference workloads, and the cloud-native stack around modern AI systems.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    title: "Observability",
    slug: "observability",
    description:
      "Explore metrics, logs, traces, and continuous profiling: OpenTelemetry pipelines, Grafana stack (Tempo / Loki / Mimir), SLOs, error budgets, and the patterns SREs use to keep production diagnosable.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
  },
  {
    title: "Platform Engineering",
    slug: "platform-engineering",
    description:
      "Internal developer platforms, golden paths, Backstage, Crossplane, scorecards, and how engineering organizations build self-service infrastructure that lets product teams ship without filing tickets.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/circleci/circleci-plain.svg",
  },
  {
    title: "GitOps",
    slug: "gitops",
    description:
      "GitOps patterns with ArgoCD and Flux: app-of-apps, sync waves, drift detection, multi-cluster reconciliation, RBAC by tenant. Declarative delivery in practice.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg",
  },
  {
    title: "eBPF",
    slug: "ebpf",
    description:
      "eBPF in production: Cilium for networking and service mesh, Tetragon for runtime security, Parca and Pixie for continuous profiling and tracing. Kernel-level observability without sidecars.",
    iconPath: "https://ebpf.io/static/logo-big.svg",
  },
  {
    title: "FinOps",
    slug: "finops",
    description:
      "Cloud cost engineering: OpenCost for Kubernetes attribution, egress optimization, right-sizing with VPA, savings plans vs reserved instances. Make cost a first-class engineering signal.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  },
  {
    title: "Security",
    slug: "security",
    description:
      "Securing systems end to end: threat modeling, secrets management, encryption at rest and in transit, hardening and least privilege, audit trails, incident response, and mapping regulatory obligations onto real infrastructure.",
    iconPath: "https://cdn.jsdelivr.net/npm/lucide-static/icons/lock.svg",
  },
  {
    title: "Supply Chain Security",
    slug: "supply-chain",
    description:
      "End-to-end software supply chain security: Sigstore, cosign, SLSA, SBOMs, Trivy, attestations, and admission control with Kyverno or OPA Gatekeeper. Trust your build, sign your artifacts.",
    iconPath:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg",
  },
  {
    title: "Resilience",
    slug: "resilience",
    description:
      "Keeping systems up when parts fail: retries with backoff and jitter, retry budgets, circuit breakers, timeouts, rate limiting, high-availability and failover. The patterns that turn a hiccup into a non-event instead of an outage.",
    iconPath:
      "https://cdn.jsdelivr.net/npm/lucide-static/icons/shield-check.svg",
  },
  {
    title: "Authorization",
    slug: "authz",
    description:
      "Answering 'can this user do this?' at scale: RBAC, ABAC and relationship-based access control (ReBAC), Google's Zanzibar and its open-source heirs OpenFGA, SpiceDB and Ory Keto. Modeling permissions as relations, keeping checks consistent, and getting a real audit story.",
    iconPath:
      "https://cdn.jsdelivr.net/npm/lucide-static/icons/key-round.svg",
  },
];

export default topics;
