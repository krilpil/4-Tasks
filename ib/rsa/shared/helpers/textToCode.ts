import alphabet from '../../const/alphabet';

const textToCode = (text: string) => {
  const textArray: string[] = text.split('');
  const codeArray: number[] = [];

  textArray.filter((litter) => {
    const code = alphabet.indexOf(litter);
    if (code) {
      codeArray.push(code);
    }
  });

  return codeArray;
};

export default textToCode;
