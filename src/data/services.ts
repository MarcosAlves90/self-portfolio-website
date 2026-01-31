export interface ServiceTier {
  id?: string;
  name: string;
  description: string; // Short description for the tier
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface ServiceCategory {
  id?: string;
  title: string;
  description: string;
  icon: string; // Bootstrap icon class
  tiers: ServiceTier[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "web-development",
    title: "Desenvolvimento Web",
    description: "Transforme visitantes em clientes com sites de alta performance, design persuasivo e otimização para o Google.",
    icon: "bi-globe",
    tiers: [
      {
        id: "essential",
        name: "Essencial (Landing Page)",
        description: "Ideal para campanhas e captura de leads. Foco total em conversão.",
        price: "R$ 900",
        features: [
          "Design de Alta Conversão (One Page)",
          "Copywriting Persuasivo Básico",
          "Velocidade Otimizada (Core Web Vitals)",
          "Integração com WhatsApp e CRM",
          "Configuração de Domínio e Hospedagem",
        ],
      },
      {
        id: "professional",
        name: "Profissional (Institucional)",
        description: "Para empresas que buscam autoridade e posicionamento digital sólido.",
        price: "R$ 1.400",
        recommended: true,
        features: [
          "Até 5 Páginas Estratégicas",
          "Blog para Marketing de Conteúdo",
          "SEO Técnico Avançado",
          "Painel Administrativo Fácil (CMS)",
          "Integração com Google Analytics 4",
        ],
      },
      {
        id: "ecommerce",
        name: "E-commerce / Portal",
        description: "Venda online ou gerencie grandes volumes de conteúdo com robustez.",
        price: "R$ 2.400",
        features: [
          "Loja Virtual Completa ou Área de Membros",
          "Integração com Pagamentos e Frete",
          "Gestão de Estoque e Pedidos",
          "Filtros e Busca Avançada",
          "Segurança Reforçada (SSL + Firewall)",
        ],
      },
    ],
  },
  {
    id: "mobile-apps",
    title: "Aplicativos Mobile",
    description: "Esteja no bolso do seu cliente. Apps nativos e híbridos com experiência de usuário (UX) viciante.",
    icon: "bi-phone",
    tiers: [
      {
        id: "mvp",
        name: "MVP (Produto Mínimo Viável)",
        description: "Valide sua ideia de startup rápido e com baixo custo.",
        price: "R$ 2.000",
        features: [
          "Funcionalidades Core do Produto",
          "Design Focado em Usabilidade",
          "Disponível para Android (APK)",
          "Banco de Dados Básico",
          "Entrega Rápida",
        ],
      },
      {
        id: "growth",
        name: "App Growth",
        description: "Para apps prontos para escalar e conquistar o mercado.",
        price: "R$ 5.000",
        recommended: true,
        features: [
          "iOS e Android (Lojas Oficiais)",
          "Notificações Push (Engajamento)",
          "Login Social (Google/Apple)",
          "Painel de Controle Web",
          "Analytics de Comportamento",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise / Super App",
        description: "Ecossistemas complexos com múltiplas integrações e IA.",
        price: "R$ 10.000",
        features: [
          "Arquitetura de Microsserviços",
          "Integrações Complexas (APIs Bancárias, etc)",
          "Modo Offline e Sincronização",
          "Chat em Tempo Real",
          "Suporte a Múltiplos Idiomas",
        ],
      },
    ],
  },
  {
    id: "software-systems",
    title: "Software & Sistemas",
    description: "Automatize processos, reduza custos e elimine erros humanos com software sob medida.",
    icon: "bi-cpu",
    tiers: [
      {
        id: "desktop-automation",
        name: "Automação Desktop",
        description: "Scripts e programas para tarefas repetitivas locais.",
        price: "R$ 500",
        features: [
          "Automação de Planilhas e Relatórios",
          "Web Scraping (Coleta de Dados)",
          "Interface Simples e Direta",
          "Execução Local (Windows/Linux)",
          "Sem Mensalidade",
        ],
      },
      {
        id: "saas",
        name: "Sistema de Gestão (SaaS)",
        description: "Centralize a operação da sua empresa na nuvem.",
        price: "R$ 1.500",
        recommended: true,
        features: [
          "Acesso via Navegador (Qualquer lugar)",
          "Múltiplos Níveis de Acesso (Permissões)",
          "Dashboards e Relatórios em Tempo Real",
          "Backup Automático na Nuvem",
          "API para Integrações",
        ],
      },
      {
        id: "enterprise-solution",
        name: "Solução Enterprise",
        description: "Software robusto para grandes operações e alta demanda.",
        price: "R$ 5.500",
        features: [
          "Alta Disponibilidade e Escalabilidade",
          "Auditoria e Logs Detalhados",
          "Integração com Hardware (IoT, Impressoras)",
          "SLA de Atendimento Prioritário",
          "Consultoria de Processos Inclusa",
        ],
      },
    ],
  },
  {
    id: "maintenance-support",
    title: "Manutenção e Suporte",
    description: "Tranquilidade total. Mantenha seu projeto seguro, atualizado e funcionando 24/7.",
    icon: "bi-tools",
    tiers: [
      {
        id: "hourly",
        name: "Hora Técnica Avulsa",
        description: "Para ajustes pontuais, correções ou consultoria rápida.",
        price: "R$ 60,00 / hora",
        features: [
          "Correção de Bugs e Erros",
          "Pequenas Alterações de Layout",
          "Atualização de Conteúdo",
          "Configuração de E-mails",
          "Consultoria Técnica",
        ],
      },
      {
        id: "monthly-basic",
        name: "Pacote Mensal (Básico)",
        description: "Garanta prioridade e monitoramento constante.",
        price: "R$ 300 / mês",
        recommended: true,
        features: [
          "Monitoramento de Uptime",
          "Backups Semanais",
          "Atualizações de Segurança (Plugins/CMS)",
          "Relatório Mensal de Performance",
          "Desconto na Hora Técnica Excedente",
        ],
      },
      {
        id: "sustaining-full",
        name: "Sustentação Full",
        description: "Sua equipe de TI terceirizada.",
        price: "R$ 1.000 / mês",
        features: [
          "Suporte Prioritário (WhatsApp)",
          "Backups Diários",
          "Otimização Contínua de Performance",
          "Ambiente de Testes (Staging)",
          "Gestão de Servidor (DevOps)",
        ],
      },
    ],
  },
];
