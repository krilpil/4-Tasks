import { heroType } from './types';

export const monsterProperty: heroType = {
  name: 'Lyutyj',
  maxHealth: 15,
  skills: [
    {
      name: 'Blow with a clawed paw',
      physicalDmg: 3,
      magicDmg: 0,
      physicArmorPercents: 20,
      magicArmorPercents: 20,
      cooldown: 0,
    },
    {
      name: 'Fiery breath',
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: 'Tail kick',
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};

export const knightProperty: heroType = {
  name: 'Evstavij',
  maxHealth: 15,
  skills: [
    {
      name: 'Blow with a military censer',
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
    },
    {
      name: 'Left heel spinner',
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
    },
    {
      name: 'Canonical fireball',
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: 'Magic Block',
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
    },
  ],
};
