const skills = [
  {
    title: "Cloud providers",
    techs: [
      {
        name: "DigitalOcean",
        slug: "digitalocean",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg",
        description: "Scalable cloud-computing infrastructure provider"
      },
      {
        name: "Google Cloud",
        slug: "gcp",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
        description: "Google Cloud Platform services"
      },
      {
        name: "AWS",
        slug: "aws",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        description: "Amazon Web Services cloud-computing"
      }
    ]
  },
  {
    title: "Infrastructure as Code & Automation Tools",
    techs: [
      {
        name: "Terraform",
        slug: "terraform",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
        description: "Infrastructure as Code tool by HashiCorp"
      },
      {
        name: "Ansible",
        slug: "ansible",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-plain.svg",
        description: "Ansible"
      }
    ]
  },
  {
    title: "Containers and Orchestration",
    techs: [
      {
        name: "Docker",
        slug: "docker",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        description: "Open-source platform for containerization"
      },
      {
        name: "Kubernetes",
        slug: "kubernetes",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        description: "Container orchestration platform"
      },
      {
        name: "Helm",
        slug: "helm",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg",
        description: "A tool for managing k8s applications with charts"
      }
    ]
  },
  {
    title: "CI/CD & GitOps Tools",
    techs: [
      {
        name: "Github Actions",
        slug: "github-actions",
        image:
          "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.2.0/githubactions.svg",
        description: "Workflow automation tool for GitHub repositories"
      },
      {
        name: "GitLab CI",
        slug: "gitlab-ci",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
        description: "CI/CD automation toolset by GitLab"
      },
      {
        name: "Jenkins",
        slug: "jenkins",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        description: "The open source automation server"
      },
      {
        name: "ArgoCD",
        slug: "argocd",
        image:
          "https://www.vectorlogo.zone/logos/argoprojio/argoprojio-icon.svg",
        description: "A declarative GitOps CD for Kubernetes"
      }

    ]
  },
  {
    title: "Code versioning and collaboration tools",
    techs: [
      {
        name: "Github",
        slug: "github",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        description: "Web-based platform for collaboration"
      },
      {
        name: "GitLab",
        slug: "gitlab",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
        description: "The most comprehensive DevSecOps Platform"
      },
      {
        name: "BitBucket",
        slug: "bitbucket",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original.svg",
        description: "Collaborative platform that integrates with Jira"
      }
    ]
  },
  {
    title: "Logging, Monitoring & Visualization",
    techs: [
      {
        name: "Prometheus",
        slug: "prometheus",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
        description: "The preferred toolkit for monitoring and altering"
      },
      {
        name: "Grafana",
        slug: "grafana",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
        description: "A tool for visualising and analyzing metrics"
      },
      {
        name: "Open Telemetry",
        slug: "open-telemetry",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opentelemetry/opentelemetry-original.svg",
        description: "A toolkit for creating and managing telemetry data"
      }
    ]
  },

  {
    title: "Programming Language",
    techs: [
      {
        name: "C/C++",
        slug: "c-cpp",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        description: "The influential programming languages"
      },
      {
        name: "Python",
        slug: "python",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        description: "Dynamic, high-level programming language"
      },
      {
        name: "PHP",
        slug: "php",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        description: "Server-side scripting language for web"
      },
      {
        name: "Golang",
        slug: "golang",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        description: "Compiled, statically-typed language"
      }
    ]
  },


  {
    title: "Backend Frameworks",
    techs: [
      {
        name: "Nest Js",
        slug: "nest-js",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
        description: "Expressive, modular TypeScript framework"
      },
      {
        name: "Fast Api",
        slug: "fast-api",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        description: "Modern, performant Python web framework"
      },
      {
        name: "Laravel",
        slug: "laravel",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
        description: "Elegant, feature-rich PHP framework"
      },
      {
        name: "Gin web framework",
        slug: "gin",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        description: "Fastest web framework written in Golang"
      }
    ]
  },

  {
    title: "SQL and NoSQL Databases",
    techs: [
      {
        name: "PostgresSQL",
        slug: "postgresql",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        description: "Powerful, open-source RDB"
      },
      {
        name: "MariaDB",
        slug: "mariadb",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        description: "Community-driven, open-source RDB"
      },
      {
        name: "MongoDB",
        slug: "mongodb",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        description: "Document-oriented NoSQL database"
      },
      {
        name: "Redis",
        slug: "redis",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
        description: "In-memory, key-value data store"
      }
    ]
  },

  {
    title: "Machine learning / Intelligence Artificial",
    techs: [
      {
        name: "Pandas",
        slug: "pandas",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        description: "Data structure and Data analysis library"
      },
      {
        name: "TensorFlow",
        slug: "tensor-flow",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        description: "ML framework made by Google"
      },
      {
        name: "OpenCV",
        slug: "opencv",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
        description: "Computer vision & ML software library"
      }
    ]
  }
];

export default skills;
