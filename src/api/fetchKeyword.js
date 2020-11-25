import axios from "axios";
import { no_image } from "../assets";
import { API_KEY, poster_url, url } from "./config";

export const fetchKeyword = async (id, page) => {
  try {
    const { data } = await axios.get(`${url}/keyword/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "movies",
        page,
      },
    });
    const modifiedData = {
      ...data,
      movies: {
        ...data.movies,
        results: data.movies.results.map((movie) => ({
          ...movie,
          poster_path: movie.poster_path
            ? poster_url + movie.poster_path
            : no_image,
        })),
      },
    };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
