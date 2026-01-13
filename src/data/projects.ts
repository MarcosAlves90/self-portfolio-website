import { Project } from "./types";

const projectsBrute: Project[] = [
  {
    title: "Mediari Consultoria",
    description: "Landing page da Mediari Consultoria desenvolvida com Nuxt.",
    link: "https://mediariconsultoria.com.br",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1755994599/mediari_zlzf1n.png",
    imageAlt: "Screenshot da landing page da Mediari Consultoria",
    skills: ["Nuxt", "Tailwindcss", "TypeScript", "Firebase", "Cloudinary"],
    year: 2025,
    company: "Mediari Consultoria LTDA",
  },
  {
    title: "Okorok",
    description:
      "Plataforma de receitas culinárias para compartilhar, criar, curtir e salvar receitas.",
    link: "https://okorok.vercel.app",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1756435274/okorok_qpinw6.png",
    imageAlt: "Screenshot da plataforma de receitas culinárias Okorok",
    skills: ["Next.js", "Tailwindcss", "TypeScript", "PostgreSQL"],
    year: 2025,
  },
  {
    title: "MidNight",
    description: "Plataforma de fichas de RPG de mesa.",
    link: "https://v1.midnight.marcospilgrim.com.br",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1755998111/midnight_mbwhbj.png",
    imageAlt: "Screenshot da plataforma de fichas de RPG de mesa.",
    skills: ["React", "Styled Components", "JavaScript", "Firebase"],
    year: 2024,
  },
  {
    title: "Diário de Mariupol",
    description: 'Landing page para o livro "Diário de Mariupol"',
    link: "https://diario-de-mariupol.vercel.app",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1755998702/diario-de-mariupol_jal1g7.png",
    imageAlt: "Screenshot da landing page para o livro 'Diário de Mariupol'",
    skills: ["React", "Tailwindcss", "TypeScript"],
    year: 2025,
  },
  // {
  //   title: "Antônia Fernandes",
  //   description: "Loja online de moda feminina e acessórios.",
  //   link: "https://www.antoniafernandestore.com.br",
  //   imageSrc:
  //     "https://res.cloudinary.com/dgsywmzb2/image/upload/v1756361385/antonia_fernandes_joykyh.png",
  //   imageAlt:
  //     "Screenshot da loja online de moda feminina e acessórios Antônia Fernandes",
  //   skills: ["HTML", "CSS", "Bagy"],
  //   year: 2024,
  //   company: "Antônia Fernandes Store",
  // },
  {
    title: "Coconut Links",
    description: "Página de links pessoais estilo Linktree.",
    link: "https://links.marcospilgrim.com.br",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1756407127/coconut_links_jpd4u7.png",
    imageAlt: "Screenshot da página de links pessoais estilo Linktree.",
    skills: ["React", "Tailwindcss", "JavaScript"],
    year: 2024,
  },
  {
    title: "Bunchin",
    description: "Plataforma de ponto digital e gestão empresarial.",
    link: "https://bunchin-project.onrender.com",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1756407486/bunchin_tskqeo.png",
    imageAlt:
      "Screenshot da plataforma de ponto digital e gestão empresarial Bunchin.",
    skills: [
      "React",
      "Tailwindcss",
      "TypeScript",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
    ],
    year: 2024,
  },
  {
    title: "Which Dog Are You?",
    description: "Quiz que indica qual seria sua raça de cachorro.",
    link: "https://which-dog-are-you.vercel.app",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1756436030/which_dog_are_you_pjpyan.png",
    imageAlt: "Screenshot do quiz Which Dog Are You?",
    skills: ["React", "JavaScript", "CSS"],
    year: 2024,
  },
  {
    title: "Além do Olhar",
    description: "Plataforma de divulgação de trabalhos criativos.",
    link: "https://alem-do-olhar.vercel.app",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1756436460/alem_do_olhar_d3setx.png",
    imageAlt:
      "Screenshot da plataforma de divulgação de trabalhos criativos Além do Olhar.",
    skills: ["React", "JavaScript", "CSS"],
    year: 2024,
  },
  {
    title: "Dicenders",
    description: "Rede social e tabuleiro virtual para jogos de RPG.",
    link: "https://dicenders-ai8s.onrender.com",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1756519742/dicenders_v3375y.png",
    imageAlt:
      "Screenshot da rede social e tabuleiro virtual para jogos de RPG Dicenders.",
    skills: [
      "Handlebars",
      "JavaScript",
      "CSS",
      "Express.js",
      "MongoDB",
      "Socket.io",
    ],
    year: 2023,
  },
  {
    title: "La Tazza",
    description:
      "Plataforma para comercialização de grãos, equipamentos e cursos voltados ao café.",
    link: "https://la-tazza.vercel.app",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1761982544/la-tazza_seq6hm.png",
    imageAlt: "Screenshot da plataforma La Tazza.",
    skills: ["Next.js", "TypeScript", "Tailwindcss", "Firebase", "Cloudinary"],
    year: 2025,
  },
  {
    title: "Portfólio Procópio",
    description: "Portfólio pessoal do designer Procópio.",
    link: "https://procoopio.com.br",
    skills: ["React", "TypeScript", "Tailwindcss", "Cloudinary"],
    year: 2025,
    company: "Arcane JVP",
  },
  {
    title: "MidNight Blue",
    description:
      "Evolução da plataforma de fichas de RPG de mesa, reconstruída para maior performance e escalabilidade.",
    link: "https://v2.midnight.marcospilgrim.com.br",
    imageSrc:
      "https://res.cloudinary.com/dgsywmzb2/image/upload/v1768342549/midnight-blue_q9wtz0.png",
    imageAlt: "Screenshot da plataforma MidNight Blue (v2).",
    skills: ["Next.js", "Tailwindcss", "TypeScript", "Firebase"],
    year: 2026,
  },
];

export const projectsSorted = [...projectsBrute].sort(
  (a, b) => a.year - b.year,
);
export const projectsReverseSorted = [...projectsBrute].sort(
  (a, b) => b.year - a.year,
);
export const projectsMainPage = [...projectsReverseSorted].filter((project) =>
  [
    "Mediari Consultoria",
    "Diário de Mariupol",
    "La Tazza",
    "MidNight Blue",
  ].includes(project.title),
);
