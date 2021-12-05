import { from, map, takeLast } from "rxjs";
import { subscriptionOnSource } from "../utils/utils";

import { inputData } from "./input-data";

interface IBitOccurrencesCounter {
  [key: string]: number[];
}

export function findSolution(): void {
  const inputDataAsArray: string[] = inputData.split(`
`);
  const manageSubscription = subscriptionOnSource(from(inputDataAsArray));

  console.log("--- Day 3: Binary Diagnostic ---");
  const solvePartOnePuzzle = () => {
    console.log("Solution for PART ONE:");
    const initial: IBitOccurrencesCounter = { 0: [], 1: [] };

    function countOccurrencesOfBit(binary: string) {
      return binary
        .split("")
        .reduce((acc: IBitOccurrencesCounter, bit: string, index: number) => {
          acc[bit][index] ? acc[bit][index]++ : (acc[bit][index] = 1);
          return acc;
        }, initial);
    }

    return () =>
      manageSubscription
        .pipe(
          map((binary) => countOccurrencesOfBit(binary)),
          takeLast(1),
          map((results) => {
            let gammaRate = "";
            let epsilonRate = "";
            results[0].forEach((value, index) => {
              if (results[1][index] > value) {
                gammaRate += "1";
                epsilonRate += "0";
                return;
              }
              gammaRate += "0";
              epsilonRate += "1";
            });
            return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
          })
        )
        .subscribe(console.log);
  };

  solvePartOnePuzzle()();
}
