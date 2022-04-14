import { Observable, filter, switchMap, debounceTime } from "rxjs";

import { getMoviesObs } from "./movie-service";

export function moviesByPrompts(
  prompts$: Observable<string>
): Observable<string[]> {
  return prompts$.pipe(
    debounceTime(500),
    filter<string>((s) => s.length > 2),
    switchMap<string, Observable<string[]>>((s) => getMoviesObs(s))
  );
}
