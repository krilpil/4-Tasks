export const getConvertedWeekday = (wordsString: string): string => {
  type replaceWordsType = {
    rus: string;
    eng: string;
  }
  
  const replaceWords: replaceWordsType[] = [
    { rus: 'ПОНЕДЕЛЬНИК', eng: 'MONDAY' },
    { rus: 'ВТОРНИК', eng: 'TUESDAY' },
    { rus: 'СРЕДА', eng: 'WEDNESDAY' },
    { rus: 'ЧЕТВЕРГ', eng: 'THURSDAY' },
    { rus: 'ПЯТНИЦА', eng: 'FRIDAY' },
    { rus: 'СУББОТА', eng: 'SATURDAY' },
    { rus: 'ВОСКРЕСЕНЬЕ', eng: 'SUNDAY' },
  ];

  replaceWords.forEach((word) => {
    wordsString = wordsString.replace(word.rus, word.eng);
  });

  return wordsString;
};
