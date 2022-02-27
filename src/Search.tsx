import * as React from "react";

import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

import { getMovieTitles, getMovieTitlesObs } from "./movie-service";

const changes$ = new BehaviorSubject("");

export function Search() {
  const [value, setValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  React.useEffect(() => {
    const subscription = changes$
      .pipe(
        tap<string>(console.log),
        switchMap<string, Observable<string[]>>((s) => getMovieTitlesObs(s)),
        tap<string[]>(setSuggestions)
      )
      .subscribe((_) => {
        // turn on the spout
      });

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    changes$.next(newValue);
  };

  const handleSelect = (idx: number) => {};

  const shouldShowSuggestions = suggestions.length > 0 && value.length > 2;

  return (
    <div style={{ width: "400px" }}>
      <TextField
        fullWidth
        onChange={handleChange}
        value={value}
        placeholder="start typing a movie title"
      />
      {shouldShowSuggestions && (
        <Paper>
          {suggestions.map((suggestion, idx) => (
            <MenuItem
              key={`suggestion-${idx}`}
              onClick={() => handleSelect(idx)}
            >
              {suggestion}
            </MenuItem>
          ))}
        </Paper>
      )}
    </div>
  );
}
