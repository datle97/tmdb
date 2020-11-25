import axios from "axios";
import { API_KEY, url, logo_url } from "./config";

export const searchCompanies = async (query, page) => {
  try {
    const { data } = await axios.get(`${url}/search/company`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query,
        page,
      },
    });
    const modifiedData = {
      ...data,
      results: data.results.map((company) => ({
        ...company,
        logo_path: company.logo_path ? logo_url + company.logo_path : "",
      })),
    };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
