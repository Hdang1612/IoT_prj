import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data/DataSlice";
import deviceReducer from "./data/DeviceSlice";
const store = configureStore({
  reducer: {
    sensor: dataReducer,
    device: deviceReducer,
  },
});

export default store;
