import axios from "axios";

const FETCH_SENSOR_DATA_URL = import.meta.env.VITE_API_URL_FETCH_SENSOR_DATA;
const FETCH_ACTION_LOGS_URL = import.meta.env.VITE_API_URL_FETCH_DEVICE_DATA;
const TOGGLE_ACTION_URL = import.meta.env.VITE_API_URL_TOGGLE_DEVICE_DATA;
const GET_DEVICE_LIST_URL = import.meta.env.VITE_API_URL_GET_DEVICE_LIST;

export const fetchSensorData = async (query) => {
  try {
    const url = FETCH_SENSOR_DATA_URL;
    const res = await axios.get(url, { params: query });
    return res;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const fetchActionLogs = async (query) => {
  try {
    const url = FETCH_ACTION_LOGS_URL;
    const res = await axios.get(url, { params: query });
    return res;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const fetchDeviceList = async () => {
  try {
    const response = await axios.get(GET_DEVICE_LIST_URL);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const toggleAction = async (id) => {
  try {
    const url = `${TOGGLE_ACTION_URL}/${id}`;
    const response = await axios.put(url);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
