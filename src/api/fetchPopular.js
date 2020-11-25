import axios from "axios";
import { no_image } from "../assets";

import { API_KEY, url, poster_url, backdrop_url } from "./config";

export const fetchPopular = async (type) => {
  try {
    const { data } = await axios.get(`${url}/${type}/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    const modifiedData = data.results.map((movie) => ({
      ...movie,
      media_type: type,
      title: movie.title ? movie.title : movie.name,
      poster_path: movie.poster_path
        ? poster_url + movie.poster_path
        : no_image,
      backdrop_path: movie.backdrop_path
        ? backdrop_url + movie.backdrop_path
        : no_image,
      release_date: movie.release_date
        ? movie.release_date
        : movie.first_air_date,
    }));
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
