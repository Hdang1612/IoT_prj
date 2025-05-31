import { useState, useEffect } from "react";

import TableData from "../components/Table";
import {
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Pagination,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  getSensorData,
  setSensorPage,
  setSensorPageSize,
} from "../redux/data/DataSlice";
import {
  getDeviceData,
  setDevicePage,
  setDevicePageSize,
} from "../redux/data/DeviceSlice";

import { sensorColumns } from "../utils/collums";
import { deviceLogsColumns } from "../utils/collums";

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");

  const dispatch = useDispatch();
  const sensor = useSelector((state) => state.sensor);
  const device = useSelector((state) => state.device);
  const itemsPerPage = useSelector((state) =>
    activeTab === 0 ? state.sensor.itemsPerPage : state.device.itemsPerPage
  );

  useEffect(() => {
    // if (activeTab === 0) {
    //   dispatch(getSensorData({ page: sensor.currentPage }));
    // } else {
    //   dispatch(getDeviceData({ page: device.currentPage }));
    // }
    handleFilter();
  }, [
    activeTab,
    sensor.currentPage,
    device.currentPage,
    device.itemsPerPage,
    sensor.itemsPerPage,
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedDevice("");
  };

  const handlePageChange = (event, value) => {
    if (activeTab === 0) {
      dispatch(setSensorPage(value));
      // dispatch(getSensorData({ page: value }));
    } else {
      dispatch(setDevicePage(value));
      // dispatch(getDeviceData({ page: value }));
    }
  };

  const handleItemsPerPageChange = (event) => {
    const newSize = event.target.value;
    if (activeTab === 0) {
      console.log(">>>>>>>>>");
      dispatch(setSensorPageSize(newSize));
    } else {
      dispatch(setDevicePageSize(newSize));
    }
  };
  const queryParamsSensor = {
    field: selectedField,
    search: searchTxt,
    page: activeTab === 0 ? sensor.currentPage : device.currentPage,
    limit: activeTab === 0 ? sensor.itemsPerPage : device.itemsPerPage,
  };
  const queryParamsDevice = {
    deviceId: selectedDevice,
    search: searchTxt,
    page: activeTab === 0 ? sensor.currentPage : device.currentPage,
    limit: activeTab === 0 ? sensor.itemsPerPage : device.itemsPerPage,
  };

  const handleFilter = () => {
    if (activeTab === 0) {
      dispatch(getSensorData(queryParamsSensor));
    } else {
      dispatch(getDeviceData(queryParamsDevice));
    }
  };

  return (
    <Box>
      <p className="uppercase font-[700] text-[2rem] my-5">table data</p>

      {/* content */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="#fff"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab
          sx={{
            fontSize: "16px",
            color: activeTab === 0 ? "#09006F" : "gray",
            textDecoration: activeTab === 0 ? "underline" : "none",
            "&:hover": {
              backgroundColor: "#f0f4ff",
              color: "#09006F",
            },
            fontWeight: "bold",
          }}
          label="Sensor Data"
        />
        <Tab
          sx={{
            fontSize: "16px",
            color: activeTab === 1 ? "#09006F" : "gray",
            textDecoration: activeTab === 1 ? "underline" : "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#f0f4ff",
              color: "#09006F",
            },
          }}
          label="Device Logs"
        />
      </Tabs>

      <Box className="flex gap-[4rem] my-[2rem] h-[5rem] filter__modal items-center ">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Filter:
        </Typography>
        {activeTab === 0 ? (
          <FormControl sx={{ width: "12rem" }}>
            <InputLabel sx={{ fontSize: 12, fontWeight: "700" }}>
              Field
            </InputLabel>
            <Select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              label="Field"
              sx={{ fontSize: "1rem" }}
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="temperature">Temperature</MenuItem>
              <MenuItem value="humidity">Humidity</MenuItem>
              <MenuItem value="light_intensity">Light</MenuItem>
              <MenuItem value="timestamp">Timestamp</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <FormControl sx={{ width: "12rem" }} disabled={activeTab === 0}>
            <InputLabel sx={{ fontSize: 12, fontWeight: "700" }}>
              Device
            </InputLabel>
            <Select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              label="Device"
              sx={{ fontSize: "1rem" }}
            >
              {device.devices.map((device) => (
                <MenuItem key={device.id} value={device.id}>
                  {device.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField
          sx={{ width: "24rem" }}
          label="TimeStamp"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleFilter()}
          sx={{
            height: "5rem",
            fontWeight: "bold",
            width: "10rem",
            padding: "4px",
            fontSize: "1.4rem",
          }}
        >
          Search
        </Button>
        <FormControl sx={{ ml: "auto", minWidth: 120 }}>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            sx={{ fontSize: "1rem" }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {activeTab === 0 && (
        <TableData
          columns={sensorColumns}
          data={sensor.sensorData}
          queryParams={queryParamsSensor}
        />
      )}
      {activeTab === 1 && (
        <TableData
          columns={deviceLogsColumns}
          data={device.actionLogs}
          queryParams={queryParamsDevice}
          tableDevice ={true}
        />
      )}
      <Pagination
        count={activeTab === 0 ? sensor.totalPages : device.totalPages}
        page={activeTab === 0 ? sensor.currentPage : device.currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        size="large"
      />
    </Box>
  );
}

export default Profile;
