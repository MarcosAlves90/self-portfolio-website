import { getProjectSkillIconClass, getProjectSkillLink } from "@/data/projectSkillIcons";

export type ProjectSkillWithIcon = {
  name: string;
  iconClass: string;
  link?: string;
};

const skillsCache = new Map<string, ProjectSkillWithIcon[]>();

export const buildProjectSkillsWithIcons = (
  skills: string[],
): ProjectSkillWithIcon[] => {
  const cacheKey = skills.join("|");
  const cached = skillsCache.get(cacheKey);
  if (cached) return cached;

  const mapped = skills.map((skill) => ({
    name: skill,
    iconClass: getProjectSkillIconClass(skill),
    link: getProjectSkillLink(skill),
  }));

  skillsCache.set(cacheKey, mapped);
  return mapped;
};
