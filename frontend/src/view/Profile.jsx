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
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useDispatch, useSelector } from "react-redux";
import { getSensorData, setSensorPage } from "../redux/data/DataSlice";
import { getDeviceData, setDevicePage } from "../redux/data/DeviceSlice";

import { sensorColumns } from "../utils/collums";
import { deviceLogsColumns } from "../utils/collums";

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();
  const sensor = useSelector((state) => state.sensor);
  const device = useSelector((state) => state.device);
  useEffect(() => {
    // if (activeTab === 0) {
    //   dispatch(getSensorData({ page: sensor.currentPage }));
    // } else {
    //   dispatch(getDeviceData({ page: device.currentPage }));
    // }
    handleFilter();
  }, [activeTab, sensor.currentPage, device.currentPage]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedDevice("");
    setStartDate(null);
    setEndDate(null);
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

  const handleFilter = () => {
    const queryParams = {
      // device: selectedDevice,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      page: activeTab === 0 ? sensor.currentPage : device.currentPage,
    };

    if (activeTab === 0) {
      dispatch(getSensorData(queryParams));
    } else {
      dispatch(getDeviceData(queryParams));
    }
  };

  return (
    <Box>
      <p className="uppercase font-[700] text-[2rem] my-5">table data</p>

      {/* Filter */}
      <Box className="flex gap-[4rem] my-[2rem] h-[5rem] filter__modal items-center ">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Filter:
        </Typography>
        <FormControl sx={{ width: "20rem" }} disabled={activeTab === 0}>
          <InputLabel sx={{ fontSize: 12, fontWeight: "700" }}>
            Device
          </InputLabel>
          <Select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            label="Device"
            sx={{ fontSize: "1rem" }}
          >
            <MenuItem value="">All Devices</MenuItem>
            <MenuItem value="Smart TV">Smart TV</MenuItem>
            <MenuItem value="WiFi">WiFi</MenuItem>
          </Select>
        </FormControl>

        <Box className="inputs-datetime-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="date-time_from"
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              // disabled={activeTab === 0}
              renderInput={(params) => <TextField {...params} fullWidth />}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { fontSize: "1.4rem" },
                  InputLabelProps: {
                    sx: {
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    },
                  },
                },
              }}
            />
            <Box className="next-icon">
              <KeyboardArrowRightIcon sx={{ fontSize: 24 }} />
            </Box>
            <DateTimePicker
              className="date-time_to"
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              // disabled={activeTab === 0}
              renderInput={(params) => <TextField {...params} fullWidth />}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { fontSize: "1.4rem" },
                  InputLabelProps: {
                    sx: {
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
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
          Filter
        </Button>
      </Box>

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

      {activeTab === 0 && (
        <TableData columns={sensorColumns} data={sensor.sensorData} />
      )}
      {activeTab === 1 && (
        <TableData columns={deviceLogsColumns} data={device.actionLogs} />
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
