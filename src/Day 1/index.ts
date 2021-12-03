import { from } from "rxjs";
import { pairwise, map, scan, filter, takeLast } from "rxjs/operators";

import { inputData } from "./input-data";

export function findSolution(): void {
  const inputDataAsArray: string[] = inputData.split(`
`);

  const inputData$ = from(inputDataAsArray);
  console.log("--- Day 1: Sonar Sweep ---");
  console.log("Solution for PART ONE:");

  inputData$
    .pipe(
      map((value) => parseInt(value, 10)),
      pairwise(),
      filter(([prev, curr]) => prev < curr),
      scan((acc, _) => acc + 1, 0),
      takeLast(1)
    )
    .subscribe(console.log);

  const inputDataAsWindows: string[][] = inputDataAsArray.flatMap((_, i) =>
    i <= inputDataAsArray.length - 3 ? [inputDataAsArray.slice(i, i + 3)] : []
  );

  const inputDataWindows$ = from(inputDataAsWindows);
  console.log("Solution for PART TWO:");

  inputDataWindows$
    .pipe(
      map((array) => array.reduce((acc, curr) => acc + parseInt(curr, 10), 0)),
      pairwise(),
      filter(([prev, curr]) => prev < curr),
      scan((acc, _) => acc + 1, 0),
      takeLast(1)
    )
    .subscribe(console.log);
}
