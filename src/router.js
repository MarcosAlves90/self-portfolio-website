import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/pages/MainPage.vue";
import ProjectsPage from "@/components/pages/ProjectsPage.vue";
import ServicesPage from "@/components/pages/ServicesPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
    meta: {
      title: "Desenvolvedor Full Stack, Designer Gráfico e Escritor",
      description:
        "Marcos Pilgrim — desenvolvedor full-stack e designer gráfico focado em performance e conversão. Contrate serviços e veja projetos com resultados.",
    },
  },


  {
    path: "/projetos",
    name: "Projects",
    component: ProjectsPage,
    meta: {
      title: "Todos os Projetos",
      description:
        "Veja todos os projetos desenvolvidos por Marcos Pilgrim, incluindo detalhes sobre tecnologias utilizadas e links para os projetos.",
    },
  },
  {
    path: "/servicos",
    name: "Services",
    component: ServicesPage,
    meta: {
      title: "Serviços e Preços",
      description:
        "Confira os serviços de desenvolvimento web, aplicativos e software oferecidos por Marcos Pilgrim.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const OFFSET = 36; // pixels de espaço acima do elemento alvo

    // Se houver hash (âncora), executa scroll manual com offset e rolagem suave
    if (to.hash) {
      return new Promise((resolve) => {
        // aguarda próximo frame para garantir que o DOM foi renderizado
        window.requestAnimationFrame(() => {
          const el = document.querySelector(to.hash);
          if (el) {
            const top = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - OFFSET);
            window.scrollTo({ top, behavior: 'smooth' });
            resolve({ left: 0, top });
          } else {
            // fallback para comportamento padrão se não encontrar o elemento
            resolve({ left: 0, top: 0 });
          }
        });
      });
    }

    // Mantém posição salva para navegação por histórico
    if (savedPosition) {
      return savedPosition;
    }

    // Padrão: topo da página
    return { top: 0 };
  },
});

export default router;
