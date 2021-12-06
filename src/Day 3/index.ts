import { from, takeLast } from "rxjs";
import { map } from "rxjs/operators";
import { subscriptionOnSource } from "../utils/utils";

import { inputData } from "./input-data";

interface IBitOccurrencesCounter {
  [key: string]: number[];
}

export function findSolution(): void {
  console.log("--- Day 3: Binary Diagnostic ---");
  const inputDataAsArray: string[] = inputData.split(`
`);
  const manageSubscription = subscriptionOnSource(from(inputDataAsArray));

  solvePartOnePuzzle()();

  function solvePartOnePuzzle() {
    console.log("Solution for PART ONE:");
    const initial: IBitOccurrencesCounter = { 0: [], 1: [] };

    return () =>
      manageSubscription
        .pipe(
          map((binary) =>
            binary
              .split("")
              .reduce(
                (acc: IBitOccurrencesCounter, bit: string, index: number) => {
                  acc[bit][index] ? acc[bit][index]++ : (acc[bit][index] = 1);
                  return acc;
                },
                initial
              )
          ),
          takeLast(1),
          map((results) => {
            const parsedResults = results[0].map((value, index) =>
              results[1][index] < value ? "0" : "1"
            );
            const [gammaRate, epsilonRate] = [
              parsedResults.join(""),
              parsedResults
                .map((value) => (parseInt(value) ? "0" : "1"))
                .join(""),
            ];
            return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
          })
        )
        .subscribe(console.log);
  }

  // function solvePartTwoPuzzle() {}
}
