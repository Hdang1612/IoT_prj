import axios from "axios";

const FETCH_SENSOR_DATA_URL = import.meta.env.VITE_API_URL_FETCH_SENSOR_DATA;
const FETCH_ACTION_LOGS_URL = import.meta.env.VITE_API_URL_FETCH_DEVICE_DATA;
const TOGGLE_ACTION_URL = import.meta.env.VITE_API_URL_TOGGLE_ACTITON_DATA;

export const fetchSensorData = async (query) => {
  try {
    const url = FETCH_SENSOR_DATA_URL;
    const res = await axios.get(url, {params:query});
    return res;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const fetchActionLogs = async (query) => {
  try {
    const url = FETCH_ACTION_LOGS_URL;
    const res = await axios.get(url,  {params:query});
    return res;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const toggleAction = async (data) => {
  try {
    const url = `${TOGGLE_ACTION_URL}/${data.id}`;
    const response = await axios.put(url);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
