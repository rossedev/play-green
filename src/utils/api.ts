import axios from "axios";
import { API_URL_SPORTS } from "./constants";
import { cache } from "react";
import { toast } from "react-toastify";

export const fetchSports = cache(async () => {
  try {
    const response = await axios.get(API_URL_SPORTS, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Error fetching sports", {
      autoClose: 2000,
    });
  }
});
