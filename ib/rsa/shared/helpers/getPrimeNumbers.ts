interface IGetPrimeNumbers {
  limitation: number;
}

const getPrimeNumbers = ({ limitation }: IGetPrimeNumbers): number[] => {
  const primeNumbers: number[] = [];

  nextPrime:
    for (let i = 2; i <= limitation; i++) {
      for (let j = 2; j < i; j++) {
        if (i % j == 0) {
          continue nextPrime;
        }
      }

      primeNumbers.push(i);
    }

  return primeNumbers;
};

export default getPrimeNumbers;
