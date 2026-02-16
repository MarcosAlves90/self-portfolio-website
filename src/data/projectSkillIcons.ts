type ProjectSkillMeta = {
  iconClass: string;
  link: string;
};

export const projectSkillMetaMap: Record<string, ProjectSkillMeta> = {
  "Angular": { iconClass: "devicon-angularjs-plain", link: "https://angular.dev/" },
  "Cloudinary": { iconClass: "bi bi-cloud", link: "https://cloudinary.com/" },
  "CSS": { iconClass: "devicon-css3-plain", link: "https://developer.mozilla.org/docs/Web/CSS" },
  "Docker": { iconClass: "devicon-docker-plain", link: "https://www.docker.com/" },
  "Express.js": { iconClass: "devicon-express-original", link: "https://expressjs.com/" },
  "Firebase": { iconClass: "devicon-firebase-plain", link: "https://firebase.google.com/" },
  "HTML": { iconClass: "devicon-html5-plain", link: "https://developer.mozilla.org/docs/Web/HTML" },
  "Handlebars": { iconClass: "devicon-handlebars-plain", link: "https://handlebarsjs.com/" },
  "Java": { iconClass: "devicon-java-plain", link: "https://www.java.com/" },
  "JavaScript": { iconClass: "devicon-javascript-plain", link: "https://developer.mozilla.org/docs/Web/JavaScript" },
  "C": { iconClass: "devicon-c-plain", link: "https://en.cppreference.com/w/c" },
  "MongoDB": { iconClass: "devicon-mongodb-plain", link: "https://www.mongodb.com/" },
  "Next.js": { iconClass: "devicon-nextjs-plain", link: "https://nextjs.org/" },
  "Nuxt": { iconClass: "devicon-nuxtjs-plain", link: "https://nuxt.com/" },
  "PostgreSQL": { iconClass: "devicon-postgresql-plain", link: "https://www.postgresql.org/" },
  "React": { iconClass: "devicon-react-original", link: "https://react.dev/" },
  "Socket.io": { iconClass: "bi bi-broadcast", link: "https://socket.io/" },
  "Spring Boot": { iconClass: "devicon-spring-plain", link: "https://spring.io/projects/spring-boot" },
  "Styled Components": { iconClass: "bi bi-brush", link: "https://styled-components.com/" },
  "TailwindCSS": { iconClass: "devicon-tailwindcss-plain", link: "https://tailwindcss.com/" },
  "TypeScript": { iconClass: "devicon-typescript-plain", link: "https://www.typescriptlang.org/" },
  "Vue": { iconClass: "devicon-vuejs-plain", link: "https://vuejs.org/" },
};

export const getProjectSkillIconClass = (skill: string): string =>
  projectSkillMetaMap[skill]?.iconClass ?? "bi bi-gear";

export const getProjectSkillLink = (skill: string): string | undefined =>
  projectSkillMetaMap[skill]?.link;
