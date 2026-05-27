<script setup>
import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";

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
        <div class="mt-6 flex space-x-4 text-2xl">
          <nuxt-link to="https://github.com/denisakp" target="_blank" aria-label="GitHub">
            <UIcon name="i-simple-icons-github" />
          </nuxt-link>

          <nuxt-link to="https://x.com/N1BBzerLZXT" target="_blank" aria-label="X (Twitter)">
            <UIcon name="i-simple-icons-x" />
          </nuxt-link>

          <nuxt-link to="https://linkedin.com/in/denis-akpagnonite" target="_blank" aria-label="LinkedIn">
            <UIcon name="i-simple-icons-linkedin" />
          </nuxt-link>
        </div>
      </div>

      <!-- About, Skills, Projects, contact -->
      <div class="flex flex-col justify-center px-10 lg:px py-16">
        <h2 class="text-2xl text-blue font-bold mb-6">👀 About</h2>

        <p class="mb-6">
            I'm Denis, a software engineer working mainly on cloud-native and distributed systems.
            I spend my time time building and maintaining backend services, improving delivery pipelines, and helping teams adopt practical DevSecOps practices.
            I share lessons learned through talks, writing, and open-source projects, and I try to approach engineering with pragmatism, curiosity, and a focus on long-term maintainability.
        </p>

        <p class="mb-10">
          Currently, I'm a Software Engineer (DevOps/SRE) at <span class="highlighted">Digi.job</span>, working on various projects involving cloud-native and distributed systems.
        
        </p>

        <!-- Skills -->
        <h2 class="text-2xl text-blue font-bold mb-4">🛠️ Skills</h2>
        <ul class="list-disc ml-4 mb-10">
          <li><b>Programming languages</b>: Go, Python, TypeScript, C/C++, Bash</li>
          <li><b>CI/CD</b>: GitLab CI, GitHub Actions</li>
          <li><b>DevOps & Cloud</b>: Kubernetes, Terraform, Ansible, ArgoCD, Helm, AWS, GCP</li>
          <li><b>SecOps & IAM</b>: OWASP, Trivy, SonarQube, Keycloak, OpenFGA</li>
          <li><b>Logging & Monitoring</b>: OpenTelemetry, Grafana, Tempo, Loki, Mimir, Prometheus</li>
        </ul>

        <!-- Contact -->
        <h2 class="text-2xl text-blue mb-2">📞 Contact</h2>
        <p class="mb-6">
          {{ email  }} (My email address is hidden in ROT47)
        </p>
      </div>
    </div>

</template>
