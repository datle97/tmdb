import axios from "axios";
import { API_KEY, url } from "./config";

export const searchKeywords = async (query, page) => {
  try {
    const { data } = await axios.get(`${url}/search/keyword`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query,
        page,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
