import axios from "axios";
import { no_image } from "../assets";
import { API_KEY, url, poster_url } from "./config";

export const searchTvShows = async (query, page) => {
  try {
    const { data } = await axios.get(`${url}/search/tv`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query,
        page,
      },
    });
    const modifiedData = {
      ...data,
      results: data.results.map((tvShow) => ({
        ...tvShow,
        title: tvShow.name,
        poster_path: tvShow.poster_path
          ? poster_url + tvShow.poster_path
          : no_image,
        release_date: tvShow.first_air_date,
      })),
    };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
