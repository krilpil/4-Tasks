import { colorsEnum } from './types';
import { keyInSelect } from 'readline-sync';

export const getRandomNumber = (limitNumber: number): number => {
  return Math.floor(Math.random() * limitNumber);
};

export const calcSubtractPercentage = (number: number, percent: number): number => {
  return Math.round(number - (number / 100 * percent));
};

export const getClearConsole = () => {
  console.log('\x1Bc');
};

export const calcMinusNumber = (number: number): number => {
  return number > 0 ? number : 0;
};

export const showColorLine = (color: colorsEnum, text: string) => {
  console.log(`${color}%s${colorsEnum.Reset}`, text);
};

export const getSelectKey = (listAnswers: string[], question: string): number => {
  return keyInSelect(listAnswers, question, {
    cancel: false,
  })
}