import alphabet from '../../const/alphabet';

const codeToText = (code: number[]) => {
  const textArray: string[] = [];

  code.forEach((index) => {
    textArray.push(alphabet[index]);
  });

  return textArray.join('');
};

export default codeToText;
