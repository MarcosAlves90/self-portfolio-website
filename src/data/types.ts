export interface Project {
  id?: string;
  title: string;
  description: string;
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  skills: string[];
  year?: number;
  company?: string;
}

export interface Experience {
  id?: string;
  period: string;
  title: string;
  description: string;
  skills: string[];
  link?: string;
}
