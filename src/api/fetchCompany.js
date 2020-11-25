import axios from "axios";
import { no_image } from "../assets";
import { API_KEY, url, poster_url, logo_url } from "./config";

export const fetchCompany = async (id, page) => {
  try {
    const { data } = await axios.get(`${url}/company/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "movies",
        page: page,
      },
    });
    const modifiedData = {
      ...data,
      logo_path: data.logo_path ? logo_url + data.logo_path : "",
      movies: {
        ...data.movies,
        results: data.movies.results.map((result) => ({
          ...result,
          poster_path: result.poster_path
            ? poster_url + result.poster_path
            : no_image,
        })),
      },
    };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
