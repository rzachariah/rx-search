import axios from "axios";
import { from, Observable, tap, filter, switchMap } from "rxjs";

import config from "./config";

type Payload = {
  Search: Movie[];
  Error: string | null;
};

type Movie = {
  Title: string;
};

function getSearchKey(prompt: string): string {
  const trimmed = prompt.trim();
  return encodeURIComponent(trimmed) + "*";
}

export function getMovies(request: string): Promise<string[]> {
  console.log("request", request);
  const searchKey = getSearchKey(request);
  return axios
    .get(`${config.baseUrl}/?s=${searchKey}&apikey=${config.apikey}`)
    .then((response) => {
      console.log("response", response);
      const data: Payload = response.data;
      if (data.Error) {
        console.error(data.Error);
        return [];
      }
      const movieTitles = data.Search.map((movie) => movie.Title);
      console.log("movieTitles", movieTitles);
      return movieTitles;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export function getMoviesObs(request: string): Observable<string[]> {
  return from(getMovies(request));
}
