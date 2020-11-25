import axios from "axios";
import { no_image } from "../assets";
import { API_KEY, url, poster_url, backdrop_url, video_url } from "./config";

export const fetchMovie = async (id) => {
  try {
    const { data } = await axios.get(`${url}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        append_to_response:
          "release_dates,credits,videos,recommendations,keywords",
      },
    });
    const modifiedData = {
      ...data,
      media_type: "movie",
      poster_path: data.poster_path ? poster_url + data.poster_path : no_image,
      backdrop_path: data.backdrop_path
        ? backdrop_url + data.backdrop_path
        : no_image,
      release_dates: data.release_dates.results[0]
        ? {
            iso_3166_1: data.release_dates.results[0].iso_3166_1,
            certification:
              data.release_dates.results[0].release_dates[0].certification,
            release_date:
              data.release_dates.results[0].release_dates[0].release_date,
          }
        : {},
      credits: {
        cast: data.credits.cast.map((person) => ({
          ...person,
          profile_path: person.profile_path
            ? poster_url + person.profile_path
            : no_image,
        })),
        crew: data.credits.crew.map((person) => ({
          ...person,
          profile_path: person.profile_path
            ? poster_url + person.profile_path
            : no_image,
        })),
      },
      videos: data.videos.results[0]
        ? {
            ...data.videos.results[0],
            key: video_url + data.videos.results[0].key,
          }
        : {},
      recommendations: data.recommendations.results.map((recommendation) => ({
        ...recommendation,
        backdrop_path: recommendation.backdrop_path
          ? backdrop_url + recommendation.backdrop_path
          : no_image,
      })),
      keywords: data.keywords.keywords,
    };

    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
