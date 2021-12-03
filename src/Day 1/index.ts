
import { from } from "rxjs";
import { pairwise, map, scan, filter, takeLast } from "rxjs/operators";

import { inputsData } from "./inputs-data";

export function findSolution(): void {
  const inputsDataAsArray = inputsData.split(`
`);

  const inputsData$ = from(inputsDataAsArray);
  console.log('--- Day 1: Sonar Sweep ---')
  console.log('Solution for PART ONE:')

  inputsData$
    .pipe(
      map((value) => parseInt(value, 10)),
      pairwise(),
      filter(([prev, curr]) => prev < curr),
      scan((acc, _) => acc + 1, 0),
      takeLast(1)
    )
    .subscribe(console.log);

  const inputsDataAsWindows = inputsDataAsArray.flatMap((_, i) =>
    i <= inputsDataAsArray.length - 3 ? [inputsDataAsArray.slice(i, i + 3)] : []
  );

  const inputsDataWindows$ = from(inputsDataAsWindows as string[][]);
  console.log('Solution for PART TWO:')

  inputsDataWindows$
    .pipe(
      map((array) =>
      array.reduce((acc, curr) => acc + parseInt(curr, 10), 0)
      ),
      pairwise(),
      filter(([prev, curr]) => prev < curr),
      scan((acc, _) => acc + 1, 0),
      takeLast(1)
    )
    .subscribe(console.log);
}
