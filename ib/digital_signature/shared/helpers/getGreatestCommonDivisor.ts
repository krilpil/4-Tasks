const getGreatestCommonDivisor = (limit: number) => {
  let gcd = 0;

  for (let i = 1; i < limit; i++) {
    if (i % limit === 1) {
      gcd = i
    }
  }

  return gcd
}

export default getGreatestCommonDivisor;
