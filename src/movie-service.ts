import axios from "axios";

import config from "./config";

type Payload={
  Search: Movie[];
}

type Movie={
  Title: string;
}

function getSearchKey(prompt: string): string {
  const trimmed = prompt.trim();
  return encodeURIComponent(trimmed) + "*";
}

export function getMovieTitles(request: string): Promise<string[]> {
  console.log("request", request);
  const searchKey = getSearchKey(request);
  return axios.get(`${config.baseUrl}/?s=${searchKey}&apikey=${config.apikey}`)
    .then(response => {
      console.log("response", response);
      const data: Payload = response.data;
      return data.Search.map(movie => movie.Title);
    });
}
