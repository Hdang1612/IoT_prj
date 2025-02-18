import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchSensorData } from "../../service/service";

export const getSensorData = createAsyncThunk(
  "sensor/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetchSensorData(params);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: "sensor",
  initialState: {
    sensorData: [],
    actionLogs: [],
    totalItems: null,
    itemCount: null,
    itemsPerPage: 5,
    totalPages: null,
    currentPage: 1,
    status: "",
    loading: false,
  },
  reducers: {},
  setSensorPage: (state, action) => {
    state.currentPage = action.payload;
  },
  setSensorPageSize: (state, action) => {
    state.itemsPerPage = action.payload;
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSensorData.pending, () => {})
      .addCase(getSensorData.fulfilled, (state, action) => {
        state.sensorData = action.payload.data.data;
        // state.currentPage = action.payload.data.currentPage;
        state.totalItems = action.payload.data.totalItems;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getSensorData.rejected, () => {});
  },
});

export const { setSensorPage, setSensorPageSize } = dataSlice.actions;
export default dataSlice.reducer;
