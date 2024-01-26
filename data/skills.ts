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
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original-wordmark.svg",
        description: "Google Cloud Platform services"
      },
      {
        name: "AWS",
        slug: "aws",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
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
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original-wordmark.svg",
        description: "Infrastructure as Code tool by HashiCorp"
      },
      {
        name: "Ansible",
        slug: "ansible",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original-wordmark.svg",
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
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        description: "Open-source platform for containerization"
      },
      {
        name: "Kubernetes",
        slug: "kubernetes",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        description: "Container orchestration platform"
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
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original-wordmark.svg",
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
        slug: "argo-cd",
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
        slug: "github-actions",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg",
        description: "Web-based platform for collaboration"
      },
      {
        name: "GitLab",
        slug: "gitlab",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original-wordmark.svg",
        description: "The most comprehensive DevSecOps Platform"
      },
      {
        name: "BitBucket",
        slug: "bitbucket",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original-wordmark.svg",
        description: "Git-based code tool for teams using Jira"
      }
    ]
  },
  {
    title: "Monitoring & Static code analysis",
    techs: [
      {
        name: "Prometheus",
        slug: "prometheus",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
        description: "An open-source monitoring system"
      },
      {
        name: "ELK",
        slug: "elk",
        image:
          "https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg",
        description: "Highly extensible stack for logs and data analysis"
      },
      {
        name: "Grafana",
        slug: "grafana",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
        description: "open source monitoring and observability tool"
      },
      {
        name: "SonarQube",
        slug: "sonarqube",
        image:
          "https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD",
        description: "continuous code quality inspection tool"
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
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg",
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
        slug: "2.nest-js",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
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
        slug: "1.laravel",
        image:
          "https://www.vectorlogo.zone/logos/laravel/laravel-icon.svg",
        description: "Elegant, feature-rich PHP framework"
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
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg",
        description: "Document-oriented NoSQL database"
      },
      {
        name: "Redis",
        slug: "redis",
        image:
          "https://www.vectorlogo.zone/logos/redis/redis-icon.svg",
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
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original-wordmark.svg",
        description: "Data structure and Data analysis library"
      },
      {
        name: "TensorFlow",
        slug: "tensor-flow",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        description: "ML framework made by Google"
      },
      {
        name: "OpenCV",
        slug: "opencv",
        image:
          "https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg",
        description: "Computer vision & ML software library"
      },
      {
        name: "Seaborn",
        slug: "seaborn",
        image:
          "https://seaborn.pydata.org/_images/logo-wide-lightbg.svg",
        description: "Data Viz library based on Matplotlib"
      }
    ]
  }
];

export default skills;
