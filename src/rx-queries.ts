import { Observable, filter, switchMap } from "rxjs";

import { getMoviesObs } from "./movie-service";

export function moviesByPrompts(
  prompts$: Observable<string>
): Observable<string[]> {
  return prompts$.pipe(
    filter<string>((s) => s.length > 2),
    switchMap<string, Observable<string[]>>((s) => getMoviesObs(s))
  );
}
