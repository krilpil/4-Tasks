const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type bullsAndCowsConstructorType = {
  numberSize: number;
  limitNumber: number;
}

type resultMoveType = {
  cows: number,
  bulls: number
}

export class BullsAndCows {
  private readonly numberSize: number;
  private readonly limitNumber: number;
  private hiddenNumber: string;
  private stepNumber: number = 0;

  constructor({ numberSize, limitNumber }: bullsAndCowsConstructorType) {
    this.numberSize = numberSize;
    this.limitNumber = limitNumber;
  }

  private static showError(error: string) {
    console.log('\x1b[31m%s\x1b[0m', error);
  }

  private static createHiddenNumber(numberSize: number, limitNumber: number): string {
    let hiddenNumber: string = '';
    while (numberSize) {
      const generatedNumber = Math.floor(Math.random() * limitNumber);
      if (hiddenNumber.indexOf(`${generatedNumber}`) === -1) {
        hiddenNumber += generatedNumber;
        numberSize--;
      }
    }
    return hiddenNumber;
  }

  private static getFeedback(cows: number, bulls: number): string {
    if (cows === 0 && bulls === 0) return 'Lucky!';
    if (cows > 4 || bulls > 2) return 'The strongest move';
    if (cows > 2 && cows <= 4 || (bulls >= 1 && bulls <= 2)) return 'Great move';
    if (cows <= 2) return 'Good move';
    return '';
  }

  async start() {
    this.hiddenNumber = BullsAndCows.createHiddenNumber(
      this.numberSize,
      this.limitNumber,
    );
    // console.log(`Generated number: ${this.hiddenNumber}`);

    console.log(`Generated number: length ${this.numberSize}, digit ${this.limitNumber}`);

    console.log(`Enter a number of ${this.numberSize} characters...`);
    await this.createMove(
      this.hiddenNumber,
      this.numberSize,
      this.limitNumber,
    );

    console.log(`You won in ${this.stepNumber} steps! Muuuu!`);

    rl.close();
  }

  private async createMove(hiddenNumber: string, numberSize: number, limitNumber: number) {
    this.stepNumber += 1;

    const guessedNumber = await this.createGuessedNumber(numberSize, limitNumber);

    const { cows, bulls } = this.getResultMove(hiddenNumber, guessedNumber);
    console.log(`${guessedNumber} - bulls: ${bulls} | cows: ${cows} | ${BullsAndCows.getFeedback(cows, bulls)}`);

    return bulls === hiddenNumber.length ? 0 : this.createMove(hiddenNumber, numberSize, limitNumber);
  }

  private getResultMove(hiddenNumber: string, guessedNumber: string): resultMoveType {
    let cows: number = 0;
    let bulls: number = 0;

    guessedNumber.split('').forEach((number, index) => {
      cows += hiddenNumber.indexOf(number) !== -1 ? 1 : 0;
      bulls += guessedNumber[index] === hiddenNumber[index] ? 1 : 0;
    });

    cows -= bulls;

    return { cows, bulls };
  }

  private async createGuessedNumber(numberSize: number, limitNumber: number): Promise<string> {
    const guessedNumber: string = await this.getReadline();

    rl.output.moveCursor(0, -1);
    rl.output.clearLine(1);

    if (guessedNumber.length === numberSize && !isNaN(Number(guessedNumber))) {

      if (Math.max.apply(null, guessedNumber.split('')) > limitNumber) {
        BullsAndCows.showError(`The digit of the number cannot exceed ${limitNumber}!`);
        return this.createGuessedNumber(numberSize, limitNumber);
      }

      const isRepeatNumbers = new Set(guessedNumber).size === numberSize;
      if (isRepeatNumbers) {
        return guessedNumber;
      } else {
        BullsAndCows.showError('The numbers should not be repeated!');
      }
    } else {
      BullsAndCows.showError(`You need to enter ${numberSize} numbers!`);
    }

    return this.createGuessedNumber(numberSize, limitNumber);
  }

  private getReadline(): Promise<string> {
    return new Promise(async (resolve) => {
      rl.on('line', (newLine) => {
        resolve(newLine);
      });
    });
  }
}
