import { heroType, skillHeroType } from './types';

interface ISkills extends skillHeroType {
  currentCooldown: number;
}

export class Hero {
  readonly name: string;
  readonly skills: ISkills[];
  private currentHealth: number;
  private readonly maxHealth: number;

  constructor({ name, maxHealth, skills }: heroType) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.skills = skills.map((skill) => {
      return { ...skill, currentCooldown: 0 };
    });
  }

  setCurrentHealth(reducedHealth: number) {
    this.currentHealth -= reducedHealth;
  }

  getCurrentHealth(): number {
    return this.currentHealth;
  }

  createDamage(skillsNumber: number): skillHeroType | null {
    if (this.skills[skillsNumber].currentCooldown === 0) {
      this.skills[skillsNumber].currentCooldown = this.skills[skillsNumber].cooldown;
      return this.skills[skillsNumber];
    }
    return null;
  }

  setRecoveryCooldown() {
    this.skills.forEach((skill, index) => {
      if (skill.currentCooldown > 0) this.skills[index].currentCooldown -= 1;
    });
  }
}
