import { useHead } from "@vueuse/head";
import { useRouter } from "vue-router";
import { seoConfig } from "@/config/seoConfig";

interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
}

export function useSEO(config: SEOConfig) {
  const router = useRouter();
  const baseUrl = "https://marcospilgrim.com.br";
  const ogImage = config.ogImage || "/marcos_lopes_portfolio_og_image.webp";
  const ogType = config.ogType || "website";
  const canonicalPath = config.canonicalPath || router.currentRoute.value.path;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  useHead({
    title: config.title,
    titleTemplate: (title) => `${title} - Marcos Pilgrim`,
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    meta: [
      {
        name: "description",
        content: config.description,
      },
      {
        name: "keywords",
        content: seoConfig.keywords.join(", "),
      },
      {
        name: "theme-color",
        content: "#ffffff",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        property: "og:url",
        content: canonicalUrl,
      },
      {
        property: "og:type",
        content: ogType,
      },
      {
        property: "og:title",
        content: config.title,
      },
      {
        property: "og:description",
        content: config.description,
      },
      {
        property: "og:image",
        content: `${baseUrl}${ogImage}`,
      },
      {
        property: "og:image:alt",
        content: "Marcos Pilgrim - Portfólio Digital",
      },
      {
        property: "og:locale",
        content: "pt_BR",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: config.title,
      },
      {
        name: "twitter:description",
        content: config.description,
      },
      {
        name: "twitter:image",
        content: `${baseUrl}${ogImage}`,
      },
      {
        name: "twitter:image:alt",
        content: "Marcos Pilgrim - Portfólio Digital",
      },
      {
        property: "twitter:domain",
        content: "marcospilgrim.com.br",
      },
      {
        property: "twitter:url",
        content: canonicalUrl,
      },
    ],
  });
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcos Pilgrim",
    url: "https://marcospilgrim.com.br",
    jobTitle: "Full Stack Developer, Graphic Designer, Writer",
    description:
      "Portfólio digital de Marcos Pilgrim, desenvolvedor full-stack, designer gráfico e escritor.",
    image: "https://marcospilgrim.com.br/marcos_pilgrim_portfolio_og_image.webp",
    sameAs: [
      "https://github.com/MarcosAlves90",
      "https://www.linkedin.com/in/marcos-alves-dev",
      "https://www.instagram.com/marcos.pilgrim",
    ],
  };
}

export function generateProjectSchema(
  title: string,
  description: string,
  image: string,
  url: string,
  skills: string[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    image: image,
    url: url,
    applicationCategory: "WebApplication",
    keywords: skills.join(", "),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Marcos Pilgrim Portfolio",
    url: "https://marcospilgrim.com.br",
    logo: "https://marcospilgrim.com.br/marcos_pilgrim_portfolio_og_image.webp",
    description:
      "Portfólio digital de Marcos Pilgrim, desenvolvedor full-stack, designer gráfico e escritor.",
    sameAs: [
      "https://github.com/MarcosAlves90",
      "https://www.linkedin.com/in/marcos-alves-dev",
      "https://www.instagram.com/marcos.pilgrim",
    ],
  };
}

export function generateContactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: "+5511949273886",
    contactType: "sales",
    email: "marcos.a.lopes7701@gmail.com",
    areaServed: "BR",
    availableLanguage: ["Português"],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://marcospilgrim.com.br",
    name: seoConfig.site.name,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://marcospilgrim.com.br/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
