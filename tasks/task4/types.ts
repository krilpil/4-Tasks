export type skillHeroType = {
  name: string,
  physicalDmg: number,
  magicDmg: number,
  physicArmorPercents: number,
  magicArmorPercents: number,
  cooldown: number,
}

export type heroType = {
  maxHealth: number,
  name: string,
  skills: skillHeroType[],
}

export enum colorsEnum {
  Reset = '\x1b[0m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgMagenta = '\x1b[35m',
  FgCyan = '\x1b[36m',
  BgMagenta = '\x1b[45m',
  BgCyan = '\x1b[46m',
}