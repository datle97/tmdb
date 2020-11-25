import axios from "axios";
import { no_image } from "../assets";
import {
  API_KEY,
  url,
  poster_url,
  twitter_url,
  instagram_url,
} from "./config";

export const fetchPerson = async (id) => {
  try {
    const { data } = await axios.get(`${url}/person/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        append_to_response: "movie_credits,external_ids",
      },
    });
    const modifiedData = {
      ...data,
      gender: 1 ? "Female" : "Male",
      profile_path: data.profile_path
        ? poster_url + data.profile_path
        : no_image,
      movie_credits: {
        cast: data.movie_credits.cast.map((person) => ({
          ...person,
          poster_path: person.poster_path
            ? poster_url + person.poster_path
            : no_image,
        })),
        crew: data.movie_credits.crew.map((person) => ({
          ...person,
          poster_path: person.poster_path
            ? poster_url + person.poster_path
            : no_image,
        })),
      },
      external_ids: {
        twitter_id: data.external_ids.twitter_id
          ? twitter_url + data.external_ids.twitter_id
          : "",
        instagram_id: data.external_ids.instagram_id
          ? instagram_url + data.external_ids.instagram_id
          : "",
      },
    };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
