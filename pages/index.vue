<script setup>
import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";
import {faGithub, faLinkedin, faXTwitter} from '@fortawesome/free-brands-svg-icons'

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);

// email hidden in ROT47
const email = `2<A28?@?:E65o8>2:=]4@>`

useSeoMeta({
  title: "Welcome",
  description: META_DESCRIPTION,

  ogTitle: "Welcome - Denis AKPAGNONITE",
  ogDescription: META_DESCRIPTION,
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me",

  twitterCard: "summary_large_image",
  twitterTitle: "Welcome - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE
});
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 font-mono">
      <!-- Header & profile -->
      <div class="flex flex-col items-center justify-center text-center lg:text-left lg:pl-20 py-16">
        <div class="text-5xl text-blue font-bold mb-6 ">&lt;/&gt;</div>
        <h2 class="text-3xl text-blue font-semibold mb-4">Denis AKPAGNONITE</h2>
        <p class="text-lg">
          Software Engineer👨🏽‍💻 | DevSecOps⎈ | SRE  📊 | Cloud Engineer ☁️
        </p>

        <!-- Social Links -->
        <div class="mt-6 flex space-x-4">
          <nuxt-link to="https://github.com/denisakp" target="_blank" >
            <font-awesome :icon="faGithub" />
          </nuxt-link>

          <nuxt-link to="https://x.com/N1BBzerLZXT" target="_blank">
            <font-awesome :icon="faXTwitter" />
          </nuxt-link>

          <nuxt-link to="https://linkedin.com/in/denis-akpagnonite" target="_blank">
            <font-awesome :icon="faLinkedin" />
          </nuxt-link>

        </div>
      </div>

      <!-- About, Skills, Projects, contact -->
      <div class="flex flex-col justify-center px-10 lg:px py-16">
        <h2 class="text-2xl text-blue font-bold mb-6">👀 About</h2>

        <p class="mb-6">
          Passionate about DevOps, Cloud Native technologies, and distributed systems. I specialize in leveraging
          open-source tools to solve challenges in data consistency, fault tolerance, and security.
        </p>

        <p class="mb-10">
          Currently, I'm a Backend & DevOps Engineer for <span class="highlighted">Mon Ami Albert</span>,
          an online tutoring platform that connects teachers with students in need of academic support. I ensure secure,
          reliable, and accessible platform operations, enabling seamless interactions.
        </p>

        <!-- Skills -->
        <h2 class="text-2xl text-blue font-bold mb-4">🛠️ Skills</h2>
        <ul class="list-disc ml-4 mb-10">
          <li><b>Programming languages</b>: Go, Python, TypeScript, C/C++, Bash, PHP</li>
          <li><b>CI/CD</b>: GitLab CI, GitHub Actions, Teamcity, Jenkins</li>
          <li><b>DevOps & Cloud</b>: Docker, Kubernetes, Terraform, Ansible, ArgoCD, Helm, AWS, GCP</li>
          <li><b>SecOps & IAM</b>: OWASP, Trivy, SonarQube, Keycloak, OpenFGA, Wazuh</li>
          <li><b>Logging & Monitoring</b>: OpenTelemetry, Grafana, Tempo, Loki, Mimir, Prometheus </li>
          <li><b>Other tools</b>: Nginx, Caddy Server, Traefik, Linux, Zabbix, Proxmox, N8N</li>
        </ul>

        <!-- Contact -->
        <h2 class="text-2xl text-blue mb-2">📞 Contact</h2>
        <p class="mb-6">
          {{ email  }} (My email address is hidden in ROT47)
        </p>
      </div>
    </div>

</template>
