const apikey = import.meta.env.VITE_APIKEY as string;
console.log("meta", import.meta.env)

const config: {
  baseUrl: string
  apikey: string
} = {
  baseUrl: "https://www.omdbapi.com",
  apikey
}

export default config;
