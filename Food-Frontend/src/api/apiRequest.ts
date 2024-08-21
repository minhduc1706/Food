import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const  makeApiRequest = async <T>(
  url: string,
  option?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios({
      url: `${API_BASE_URL}${url}`, 
      ...option,
    });

    console.log("API Response:", response);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An error occurred";

    console.error(`API Request failed: ${errorMessage}`, error);

    throw new Error(errorMessage);
  }
};
