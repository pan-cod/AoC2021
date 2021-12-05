import { Observable } from "rxjs";

export function subscriptionOnSource<T>(source: Observable<T>) {
  return new Observable<T>((observer) => {
    console.log("The source is subscribing!");
    const subscription = source
      .subscribe(observer);
    return () => {
      subscription.unsubscribe();
      console.log("Clean, the source is unsubscribed!");
    };
  });
}
