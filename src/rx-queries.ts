import { Observable, filter, switchMap } from "rxjs";

import { getMoviesObs } from "./movie-service";

export function moviesByQueryObs(
  changes$: Observable<string>
): Observable<string[]> {
  return changes$.pipe(
    filter<string>((s) => s.length > 2),
    switchMap<string, Observable<string[]>>((s) => getMoviesObs(s))
  );
}
