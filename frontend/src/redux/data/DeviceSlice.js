import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchActionLogs, fetchDeviceList } from "../../service/service";

export const getDeviceData = createAsyncThunk(
  "device/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const res1 = await fetchActionLogs(params);
      const res2 = await fetchDeviceList();
      return {
        actionLogs: res1.data,
        devices: res2.data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    devices: [],
    actionLogs: [],
    totalItems: null,
    itemCount: null,
    itemsPerPage: 5,
    totalPages: null,
    currentPage: 1,
    status: "",
    loading: false,
  },
  reducers: {
    setDevicePage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDevicePageSize: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeviceData.pending, () => {})
      .addCase(getDeviceData.fulfilled, (state, action) => {
        state.actionLogs = action.payload.actionLogs.data.data;
        // state.currentPage = action.payload.actionLogs.data.currentPage;
        state.totalItems = action.payload.actionLogs.data.totalItems;
        state.totalPages = action.payload.actionLogs.data.totalPages;
        state.devices = action.payload.devices;
      })
      .addCase(getDeviceData.rejected, () => {});

    // builder
    //   .addCase(toggleDeviceStatus.pending, () => {})
    //   .addCase(toggleDeviceStatus.fulfilled, (state, action) => {
    //     state.actionLogs = action.payload.data.data;
    //   })
    //   .addCase(toggleDeviceStatus.rejected, () => {});
  },
});

export const { setDevicePage, setDevicePageSize } = deviceSlice.actions;
export default deviceSlice.reducer;
