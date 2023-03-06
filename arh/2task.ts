import { keyInSelect } from 'readline-sync';

type IProcesses = number[]
type ICpu = number[][]
type IIndexedProcesses = {
  index: number,
  value: number
}

// Процессы нуждающиеся в обработке
const initialProcesses: IProcesses = [10, 5, 3, 13, 1, 17, 3, 4, 18, 10, 3];

// Таблица подготовленных данных
const resultTable = [];

// Массив объектов индексов и значений
const getIndexesProcesses = (array: number[]): IIndexedProcesses[] => {
  return array.map((value, index) => {
    return { index, value };
  });
};

const getExecutionProcesses = (indexedProcesses: IProcesses, processes: IProcesses): IProcesses => {
  return indexedProcesses.map((indexedProcess) => {
    return processes[indexedProcess];
  });
};

// Генерация случайного массива
const getGenArrays = (length: number): number[] => {
  const min: number = 1;
  const max: number = 10;

  const arrayTasks: number[] = [];

  for (let i = 0; i < length; i++) {
    arrayTasks.push(Math.floor(Math.random() * (max - min) + min));
  }

  return arrayTasks;
};

// Получить индексы отсортированных процессов по возрастанию
const getIndexesSortIncreaseArray = (array: IIndexedProcesses[]): IIndexedProcesses[] => {
  return array.sort((a, b) => {
    return b.value - a.value;
  });
};

// Сумма массива
const getSumArray = (arrays: number[]) => {
  return arrays.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};

// Инициализация процессора с нужным количеством потоков
const handleProcessorInitialization = (cpuSteams: number): ICpu => {
  const cpu: ICpu = [];

  for (let streamNumber = 0; streamNumber < cpuSteams; streamNumber++) {
    cpu.push([]);
  }

  return cpu;
};

// Индекс менее загруженного потока
const getIndexLessLoadStream = (cpu: ICpu, processes: IProcesses): number => {
  let indexMinLoadSteam: number = 0;

  cpu.reduce((minSumProcessStream, currentStream, currentIndex) => {
    const currentSumExecutionProcesses = getSumArray(getExecutionProcesses(currentStream, processes));

    if (currentSumExecutionProcesses < minSumProcessStream) {
      indexMinLoadSteam = currentIndex;
      minSumProcessStream = currentSumExecutionProcesses;
    }

    return minSumProcessStream;
  }, getSumArray(getExecutionProcesses(cpu[0], processes)));

  return indexMinLoadSteam;
};


const addResultTable = (currentStream: number, cpu: ICpu, processes: IProcesses) => {
  resultTable.push({
    [`STREAM ${currentStream + 1}`]: getExecutionProcesses(cpu[currentStream], processes).toString(),
    [`SUM ${currentStream + 1}`]: getSumArray(getExecutionProcesses(cpu[currentStream], processes)),
  });
};

// Разделение процессов по потокам
const getSeparateProcesses = (cpu: ICpu, processes: IProcesses) => {
  const indexedProcesses = getIndexesProcesses(processes);

  let currentStream: number = 0;

  getIndexesSortIncreaseArray(indexedProcesses).forEach((currentIndexedProcess, currentIndexStream) => {
    const indexLessLoadStream = getIndexLessLoadStream(cpu, processes);
    cpu[indexLessLoadStream].push(currentIndexedProcess.index);

    if (indexLessLoadStream !== currentStream) {
      addResultTable(currentStream, cpu, processes);
      currentStream = indexLessLoadStream;
    }

    if (currentIndexStream === processes.length - 1) {
      addResultTable(currentStream, cpu, processes);
    }
  });
};

const showMenu = () => {
  // Количество потоков в процессоре
  const CPU_STREAMS: number = 2;
  const CPU = handleProcessorInitialization(CPU_STREAMS);
  const menu = ['Случайные числа', 'Тест 1'];

  const select = keyInSelect(menu, 'Выберите один из вариантов', {
    cancel: false,
  });

  if (select === 0) {
    getSeparateProcesses(CPU, getGenArrays(9));
  }

  if (select === 1) {
    getSeparateProcesses(CPU, initialProcesses);
  }
};

showMenu();

console.table(resultTable);
