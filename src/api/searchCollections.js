import axios from "axios";
import { no_image } from "../assets";
import { API_KEY, url, poster_url } from "./config";

export const searchCollections = async (query, page) => {
  try {
    const { data } = await axios.get(`${url}/search/collection`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query,
        page,
      },
    });
    const modifiedData = {
      ...data,
      results: data.results.map((collection) => ({
        ...collection,
        title: collection.name,
        poster_path: collection.poster_path
          ? poster_url + collection.poster_path
          : no_image,
      })),
    };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
