import axios from "axios";
import { no_image } from "../assets";
import { API_KEY, poster_url, url } from "./config";

export const fetchCollection = async (id) => {
  try {
    const { data } = await axios.get(`${url}/collection/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    const modifiedData = {
      ...data,
      title: data.name,
      poster_path: data.poster_path ? poster_url + data.poster_path : no_image,
      backdrop_path: data.backdrop_path
        ? poster_url + data.backdrop_path
        : no_image,
      vote_average: data.parts.reduce(
        (acc, cur) => acc + cur.vote_average / data.parts.length,
        0
      ),
      parts: data.parts.map((movie) => ({
        ...movie,
        poster_path: movie.poster_path
          ? poster_url + movie.poster_path
          : no_image,
      })),
    };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
