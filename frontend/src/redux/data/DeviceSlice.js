import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchActionLogs, toggleAction } from "../../service/service";

export const getDeviceData = createAsyncThunk(
  "device/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetchActionLogs(params);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleDeviceStatus = createAsyncThunk(
  "device/toggle",
  async (data, { rejectWithValue }) => {
    try {
      const res = await toggleAction(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    sensorData: [],
    actionLogs: [],
    totalItems: null,
    itemCount: null,
    itemsPerPage: 10,
    totalPages: null,
    currentPage: 1,
    status: "",
    loading: false,
  },
  reducers: {
    setDevicePage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeviceData.pending, () => {})
      .addCase(getDeviceData.fulfilled, (state, action) => {
        state.actionLogs = action.payload.data.data;
        state.currentPage = action.payload.data.currentPage;
        // state.itemsPerPage = action.payload.itemsPerPage;
        state.totalItems = action.payload.data.totalItems;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getDeviceData.rejected, () => {});
  },
});

export const { setDevicePage, setPageSize } = deviceSlice.actions;
export default deviceSlice.reducer;
