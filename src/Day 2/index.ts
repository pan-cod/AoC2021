import { from, groupBy, map, mergeMap, scan, takeLast, toArray } from "rxjs";

import { inputData } from "./input-data";

export function findSolution(): void {
  const inputDataAsArray: string[] = inputData.split(`
`);

  const inputData$ = from(inputDataAsArray);
  console.log("--- Day 2: Dive! ---");
  console.log("Solution for PART ONE:");

  inputData$
    .pipe(
      groupBy((data) => data.includes("forward")),
      mergeMap((grouppedData) =>
        grouppedData.pipe(
          toArray(),
          map((array) =>
            array.map((value) => {
              const splitValue = value.split(" ");

              if (splitValue[0] === "up") {
                return -parseInt(splitValue[1], 10);
              }
              return parseInt(splitValue[1], 10);
            })
          )
        )
      ),
      scan(
        (acc, _value) => acc * _value.reduce((acc, curr) => acc + curr, 0),
        1
      ),
      takeLast(1)
    )
    .subscribe(console.log);
}
