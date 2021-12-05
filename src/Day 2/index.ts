import { from, groupBy, map, mergeMap, scan, takeLast, toArray } from "rxjs";
import { subscriptionOnSource } from "../utils/utils";

import { inputData } from "./input-data";

export function findSolution(): void {
  const inputDataAsArray: string[] = inputData.split(`
`);
  const manageSubscription$ = subscriptionOnSource(from(inputDataAsArray));

  console.log("--- Day 2: Dive! ---");
  console.log("Solution for PART ONE:");

  const mapArraysToNumbers = (array: string[]) =>
    array.map((value) => {
      const splitValue = value.split(" ");

      if (splitValue[0] === "up") {
        return -parseInt(splitValue[1], 10);
      }
      return parseInt(splitValue[1], 10);
    });

  manageSubscription$
    .pipe(
      groupBy((data) => data.includes("forward")),
      mergeMap((grouppedData) =>
        grouppedData.pipe(
          toArray(),
          map((array) => mapArraysToNumbers(array))
        )
      ),
      scan(
        (acc, _value) => acc * _value.reduce((acc, curr) => acc + curr, 0),
        1
      ),
      takeLast(1)
    )
    .subscribe(console.log);

  console.log("Solution for PART TWO:");
  const solvePartTwoPuzzle = () => {
    let aim = 0;
    let depth = 0;
    let horizontal = 0;

    function switchValues(direction: string, value: number) {
      switch (direction) {
        case "up": {
          aim -= value;
          break;
        }
        case "down": {
          aim += value;
          break;
        }
        default: {
          depth += value * aim;
          horizontal += value;
        }
      }
    }

    return () =>
      manageSubscription$
        .pipe(
          map((value) => {
            const splitValue = value.split(" ");
            switchValues(splitValue[0], parseInt(splitValue[1], 10));
            return horizontal * depth;
          }),
          takeLast(1)
        )
        .subscribe(console.log);
  };

  solvePartTwoPuzzle()();
}
