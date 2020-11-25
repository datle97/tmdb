import axios from "axios";
import { no_image } from "../assets";
import {
  API_KEY,
  url,
  poster_url,
  backdrop_url,
  logo_url,
  video_url,
} from "./config";

export const fetchTvShow = async (id) => {
  try {
    const { data } = await axios.get(`${url}/tv/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        append_to_response:
          "content_ratings,credits,videos,recommendations,keywords",
      },
    });
    const modifiedData = {
      ...data,
      media_type: "tv",
      title: data.name,
      poster_path: data.poster_path ? poster_url + data.poster_path : no_image,
      backdrop_path: data.backdrop_path
        ? backdrop_url + data.backdrop_path
        : no_image,
      release_date: data.first_air_date,
      runtime: data.episode_run_time[0],
      release_dates: data.content_ratings.results[0]
        ? {
            iso_3166_1: data.content_ratings.results[0].iso_3166_1,
            certification: data.content_ratings.results[0].rating,
            release_date: data.first_air_date,
          }
        : {},
      seasons: data.seasons.map((season) => ({
        ...season,
        poster_path: season.poster_path
          ? poster_url + season.poster_path
          : no_image,
      })),
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
        title: recommendation.name,
        backdrop_path: recommendation.backdrop_path
          ? backdrop_url + recommendation.backdrop_path
          : no_image,
        release_date: recommendation.first_air_date,
      })),
      networks: data.networks[0]
        ? {
            ...data.networks[0],
            logo_path: data.networks[0].logo_path
              ? logo_url + data.networks[0].logo_path
              : "",
          }
        : {},
      keywords: data.keywords.results,
    };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
