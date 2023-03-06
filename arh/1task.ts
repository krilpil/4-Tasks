type ICombination = number[];
let count = 0;

let saveCombination: number[] = [];

export const getSumArray = (arr: ICombination): number => {
  let x = 0;
  return arr.map(i => x += i, x).reverse()[0];
};

export const getGenArrays = (length: number): number[] => {
  const min: number = 1;
  const max: number = 3;

  const arrayTasks: number[] = [];

  for (let i = 0; i < length; i++) {
    arrayTasks.push(Math.floor(Math.random() * (max - min) + min));
  }

  console.log(`Сгенерированная комбинация: ${arrayTasks}`);
  saveCombination = arrayTasks;

  return arrayTasks;
};

const getAverageTicksWaiting = (ticksTasks: ICombination): number => {
  let sumAverageTicksWaiting: number = 0;
  let currentWaiting: number = 0;

  ticksTasks.forEach((task, index) => {
    if (index !== ticksTasks.length - 1) {
      currentWaiting += task;
      sumAverageTicksWaiting += currentWaiting;
    }
  });

  return sumAverageTicksWaiting / (ticksTasks.length);
};

const getAverageTicksExecution = (ticksTasks: ICombination): number => {
  let accumulator: number = 0;

  ticksTasks.reduce((previousExecution, ticks) => {
    const currentExecution = previousExecution + ticks;
    accumulator += currentExecution;
    return currentExecution;
  }, 0);

  return accumulator / ticksTasks.length;
};

export const perm = (theTasks: ICombination) => {
  let bestCombination: ICombination = [...theTasks];
  let bestTicksExecution: number = getAverageTicksExecution(theTasks);

  const sumArray = getSumArray(theTasks);

  showTable(theTasks, sumArray);

  const N = theTasks.length;
  const p = theTasks.map((_, i) => i);
  let index = 1;

  while (index < N) {
    p[index]--;

    const j = index % 2 * p[index];
    [theTasks[j], theTasks[index]] = [theTasks[index], theTasks[j]];

    showTable(theTasks, sumArray);

    if (bestTicksExecution > getAverageTicksExecution(theTasks)) {
      bestTicksExecution = getAverageTicksExecution(theTasks);
      bestCombination = [...theTasks];
    }

    index = 1;

    while (p[index] === 0) {
      p[index] = index;
      index += 1;
    }
  }

  showTable(bestCombination, sumArray);
  console.log(`Average ticks execution: ${bestTicksExecution}`);
  console.log(`Average ticks waiting: ${getAverageTicksWaiting(bestCombination)}`);
};

const showBorder = (columns: number): void => {
  let border: string = '';
  for (let i = 0; i <= columns; i++) {
    border += '* * * *\t';
  }
  console.log(border + '\n');
};

const showHeader = (columns: number): void => {
  showBorder(columns);
  let header: string = ' \t';
  for (let i = 1; i <= columns; i++) {
    header += `${i}\t`;
  }
  console.log(header + '\n');
};

const showRow = (numberTask: number, preventTask: number, task: number, columns: number): void => {
  let row: string = `P${saveCombination.filter((taskCombination, index) => {
    if (task === taskCombination) {
      return index;
    }
  })}\t`;
  for (let tick = 1; tick <= columns; tick++) {
    if (tick <= preventTask) {
      row += 'Г\t';
    } else if (tick <= task + preventTask) {
      row += 'И\t';
    } else {
      row += 'З\t';
    }
  }
  console.log(row + '\n');
};

const showTable = (combination: ICombination, sumArray: number) => {
  console.log(count);
  count++;

  showHeader(sumArray);

  let preventTask: number = 0;
  for (let task = 0; task < combination.length; task++) {
    showRow(task, preventTask, combination[task], sumArray);
    preventTask += combination[task];
  }
};

perm(getGenArrays(3));
