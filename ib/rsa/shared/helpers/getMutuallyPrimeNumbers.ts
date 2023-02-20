interface IGetMutuallyPrimeNumbers {
  primeNumbers: number[];
  limitation: number;
}

const getMutuallyPrimeNumbers = ({ primeNumbers, limitation }: IGetMutuallyPrimeNumbers): number[] => {
  return primeNumbers.filter((number) => {
    if (limitation % number !== 0) return number;
  });
};

export default getMutuallyPrimeNumbers;
