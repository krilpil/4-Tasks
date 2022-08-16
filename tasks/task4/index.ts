import { Hero } from './heroes';
import { knightProperty, monsterProperty } from './heroesProperty';
import { colorsEnum, skillHeroType } from './types';
import {
  calcMinusNumber,
  calcSubtractPercentage,
  getClearConsole,
  getRandomNumber,
  getSelectKey,
  showColorLine,
} from './helpers';

export const start = () => {
  getClearConsole();

  showGreeting();

  const complexity: number = getSelectKey(['Hard', 'Medium', 'Easy'], 'Choose the complexity?') + 2;

  const monster = new Hero(monsterProperty);
  const knight = new Hero({
    ...knightProperty,
    maxHealth: complexity * 5,
  });

  battle(monster, knight);

  getClearConsole();

  showStatusBar(monster, knight);

  (knight.getCurrentHealth() > 0) ? showColorLine(colorsEnum.FgGreen, `${knight.name} won!`) :
    (monster.getCurrentHealth() > 0) ? showColorLine(colorsEnum.FgRed, `${monster.name} won!`) :
      showColorLine(colorsEnum.FgYellow, `No one won!`);
};

const battle = (monster: Hero, knight: Hero) => {
  getClearConsole();

  showStatusBar(monster, knight);

  const monsterMoves = createMoves(monster);
  showSkill(monster.name, monsterMoves);

  const knightMoves = createMoves(knight, showInterfaceMoves(knight));

  monster.setCurrentHealth(calcDamage(knightMoves, monsterMoves));
  knight.setCurrentHealth(calcDamage(monsterMoves, knightMoves));

  if (monster.getCurrentHealth() >= 1 && knight.getCurrentHealth() >= 1) {
    monster.setRecoveryCooldown();
    knight.setRecoveryCooldown();
    return battle(monster, knight);
  }
};

const calcDamage = (attacking: skillHeroType, defending: skillHeroType): number => {
  return (
    calcSubtractPercentage(attacking.physicalDmg, defending.physicArmorPercents) +
    calcSubtractPercentage(attacking.magicDmg, defending.magicArmorPercents)
  );
};

const createMoves = (hero: Hero, skillNumber: number = null): skillHeroType => {
  const moves: skillHeroType = (skillNumber !== null) ?
    hero.createDamage(skillNumber) : hero.createDamage(getRandomNumber(hero.skills.length));
  return moves !== null ? moves : createMoves(hero);
};

const showInterfaceMoves = (hero: Hero): number => {
  const skills: string[] = hero.skills.reduce((result, {
    name,
    currentCooldown,
    magicDmg,
    magicArmorPercents,
    physicArmorPercents,
    physicalDmg,
  }, index) => {
    if (currentCooldown === 0) {
      result[index] =
        `${name} (PD=${physicalDmg} | MD=${magicDmg} | PA=${physicArmorPercents}% | MA=${magicArmorPercents}%)`;
    }
    return result;
  }, []);

  return getSelectKey(skills, 'Which skill should I choose?');
};

const showStatusBar = (monster: Hero, knight: Hero) => {
  const monsterCH: number = calcMinusNumber(monster.getCurrentHealth());
  const knightCH: number = calcMinusNumber(knight.getCurrentHealth());

  showColorLine(colorsEnum.FgCyan, `${monster.name} ${monsterCH}HP VS ${knight.name} ${knightCH}HP\n`);
};

const showGreeting = () => {
  showColorLine(colorsEnum.BgCyan, '******************');
  showColorLine(colorsEnum.BgCyan, '*** Task No. 4 ***');
  showColorLine(colorsEnum.BgCyan, '*** RPG battle ***');
  showColorLine(colorsEnum.BgCyan, '******************');
  showColorLine(colorsEnum.BgMagenta, '\nEvstavij VS Lyutyj');

};

const showSkill = (heroName: string, skill: skillHeroType) => {
  showColorLine(colorsEnum.FgRed, `${heroName} chose an action: ${skill.name}`);
  showColorLine(colorsEnum.FgMagenta, `Physical damage = ${skill.physicalDmg}`);
  showColorLine(colorsEnum.FgMagenta, `Magic damage = ${skill.magicDmg}`);
  showColorLine(colorsEnum.FgMagenta, `Physical armor = ${skill.physicArmorPercents}`);
  showColorLine(colorsEnum.FgMagenta, `Magic armor = ${skill.magicArmorPercents}`);
};